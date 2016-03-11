import objectAssign from 'object-assign'

let vue
let _vms = {}
let _nameSpace = {
  methods: '$mq',
  variables: '$mv'
}
let _methods = {expr, below, above, beyond, between}
let _mqData = {
  created() {
    let root = this.$parent

    if (root) {
      this.$set('$mq.resize', root[_nameSpace.methods].resize)
    } else {
      _vms[this._uid] = this
      vue.util.defineReactive(this[_nameSpace.methods], 'resize', 1)
    }
  },
}

export default {
  methods: _methods,
  install(Vue, {
    methods = {},
    variables = {},
    nameSpace = {},
  } = {}) {
    vue = Vue
    objectAssign(_nameSpace, nameSpace)

    Vue.options = Vue.util.mergeOptions(Vue.options, _mqData)
    Vue.prototype[_nameSpace.methods] = objectAssign({}, _methods, methods)
    Vue.prototype[_nameSpace.variables] = variables
    initResize();
  }
}

function initResize() {
  let debounseResize = vue.util.debounce(() => {
    Object.keys(_vms).forEach(key => ++_vms[key][_nameSpace.methods].resize)
  } , 150)

  window.addEventListener('resize', debounseResize)
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
  let [value, measurement = 'width'] = getArgs(args)
  return matchMedia(`(max-${measurement}: ${prepare(value)})`).matches
}

function above(...args) {
  let [value, measurement = 'width'] = getArgs(args)
  return matchMedia(`(min-${measurement}: ${prepare(value)})`).matches
}

function between(...args) {
  let [value, measurement = 'width'] = getArgs(args)
  let [minVal, maxVal] = value

  return matchMedia(`
    (min-${measurement}: ${prepare(minVal)}) and
    (max-${measurement}: ${prepare(maxVal)})
  `).matches
}

function beyond(...args) {
  let [value, measurement = 'width'] = getArgs(args)
  let [minVal, maxVal] = value

  return matchMedia(`
    (min-${measurement}: ${prepare(maxVal)}),
    (max-${measurement}: ${prepare(minVal)})
  `).matches
}
