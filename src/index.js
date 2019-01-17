import throttle from 'lodash.throttle'

// lazy methods
let extend
let defineReactive

const mapVmIdToVm = new Map();

const _nameSpace = {
  methods: '$mq',
  variables: '$mv'
}
const _methods = {expr, below, above, beyond, between}
const _mqData = {
  created() {
    const root = this.$parent

    if (root) {
      defineReactive(this[_nameSpace.methods], 'resize', root[_nameSpace.methods].resize)
    } else {
      mapVmIdToVm.set(this._uid, this)
      defineReactive(this[_nameSpace.methods], 'resize', 1)
    }
  },
  beforeDestroy() {
    mapVmIdToVm.delete(this._uid)
  }
}

export default {
  methods: _methods,
  install(Vue, {
    methods = {},
    variables = {},
    nameSpace = {},
  } = {}) {
    lazyInitMethods(Vue)
    extend(_nameSpace, nameSpace)

    Vue.mixin(_mqData)
    Vue.prototype[_nameSpace.methods] = extend(extend({}, _methods), methods)
    Vue.prototype[_nameSpace.variables] = variables

    initResize()
  }
}

function lazyInitMethods(Vue) {
  extend = Vue.util.extend
  defineReactive = Vue.util.defineReactive
}

function initResize() {
  let throttleResize = throttle(() => {
    mapVmIdToVm.forEach((vm) => ++vm[_nameSpace.methods].resize)
  } , 150)

  window.addEventListener('resize', throttleResize)
}

function getArgs(args) {
  return args.length > 0 ? args.reverse() : args
}

function prepare(val) {
  return ('' + parseInt(val)).length === ('' + val).length
    ? `${val}px`
    : val
}

function expr(expressionString) {
  return matchMedia(expressionString).matches
}

function below(...args) {
  const [value, measurement = 'width'] = getArgs(args)
  return matchMedia(`(max-${measurement}: ${prepare(value)})`).matches
}

function above(...args) {
  const [value, measurement = 'width'] = getArgs(args)
  return matchMedia(`(min-${measurement}: ${prepare(value)})`).matches
}

function between(...args) {
  const [value, measurement = 'width'] = getArgs(args)
  const [minVal, maxVal] = value

  return matchMedia(`
    (min-${measurement}: ${prepare(minVal)}) and
    (max-${measurement}: ${prepare(maxVal)})
  `).matches
}

function beyond(...args) {
  const [value, measurement = 'width'] = getArgs(args)
  const [minVal, maxVal] = value

  return matchMedia(`
    (min-${measurement}: ${prepare(maxVal)}),
    (max-${measurement}: ${prepare(minVal)})
  `).matches
}
