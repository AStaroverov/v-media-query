// div v-mq:above.width.resize="100"

let vue
let vms = {}
let mqData = {
  created() {
    vue.util.defineReactive(this.$mq, 'resize', 1)
    vms[this._uid] = this;
  },
}

export default {
  mixin: mqData,
  install: function (Vue, options) {
    vue = Vue
    Vue.options = Vue.util.mergeOptions(Vue.options, mqData)

    Vue.prototype.$mq = {}
    Vue.prototype.$mq.resize
    Vue.prototype.$above = above
    Vue.prototype.$mq.below = below
    Vue.prototype.$mq.between = between
    Vue.prototype.$mq.beyond = beyond
    initResize();
  }
}
// METHODS

let initResize = function() {
  let debounseResize = vue.util.debounce(() => {
    let val = vue.prototype.$mq.resize + 1;
    Object.keys(vms).forEach(key => vms[key].$mq.resize = val);
  } , 150)

  window.addEventListener('resize', debounseResize)
}

let prepare = function(val) {
  return ('' + parseInt(val)).length === ('' + val).length
    ? `${val}px`
    : val
}

let below = function(value, measurement = 'width') {
  return matchMedia(`(max-${measurement}: ${prepare(value)})`).matches
}

let above = function(value, measurement = 'width') {
  console.log(arguments, this)
  return matchMedia(`(min-${measurement}: ${prepare(value)})`).matches
}

let between = function(minAndMax, measurement = 'width') {
  let [minVal, maxVal] = JSON.parse(minAndMax)

  return matchMedia(`(
    min-${measurement}: ${prepare(minVal)})
    and
    (max-${measurement}: ${prepare(maxVal)}
  )`).matches
}

let beyond = function(minAndMax, measurement = 'width') {
  let [minVal, maxVal] = JSON.parse(minAndMax)

  return matchMedia(`
    (max-${measurement}: ${prepare(minVal)})
    or
    (min-${measurement}: ${prepare(maxVal)})
  `).matches
}

let methods = {below, above, between, beyond};
