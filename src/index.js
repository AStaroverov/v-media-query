// div v-mq:above.width.resize="100"

let vue
let vms = {}
let mqData = {
  created() {
    let root = this.$parent;

    if (root) {
      vue.util.defineReactive(this.$mq, 'resize', root.$mq.resize)
    } else {
      vue.util.defineReactive(this.$mq, 'resize', 1)
      vms[this._uid] = this;
    }
  },
}

export default {
  install: function (Vue, options) {
    vue = Vue
    Vue.options = Vue.util.mergeOptions(Vue.options, mqData)

    Vue.prototype.$mq = {
      resize: 1,
      expr: expr,
      below: below,
      above: above,
      beyond: beyond,
      between: between,
    }
    initResize();
  }
}
// METHODS

let initResize = function() {
  let debounseResize = vue.util.debounce(() => {
    Object.keys(vms).forEach(key => ++vms[key].$mq.resize);
  } , 150)

  window.addEventListener('resize', debounseResize)
}

let getArgs = function(args) {
  return args.length > 0 ? args.reverse() : args
}

let prepare = function(val) {
  return ('' + parseInt(val)).length === ('' + val).length
    ? `${val}px`
    : val
}

let expr = function(expressionString) {
  return matchMedia(expressionString).matches
}

let below = function(...args) {
  let [value, measurement = 'width'] = getArgs(args)
  return matchMedia(`(max-${measurement}: ${prepare(value)})`).matches
}

let above = function(...args) {
  let [value, measurement = 'width'] = getArgs(args)
  return matchMedia(`(min-${measurement}: ${prepare(value)})`).matches
}

let between = function(...args) {
  let [value, measurement = 'width'] = getArgs(args)
  let [minVal, maxVal] = value

  return matchMedia(`(
    min-${measurement}: ${prepare(minVal)})
    and
    (max-${measurement}: ${prepare(maxVal)}
  )`).matches
}

let beyond = function(...args) {
  let [value, measurement = 'width'] = getArgs(args)
  let [minVal, maxVal] = value

  return matchMedia(`
    (max-${measurement}: ${prepare(minVal)})
    or
    (min-${measurement}: ${prepare(maxVal)})
  `).matches
}

let methods = {below, above, between, beyond};
