// div v-mq:above.width.resize="100"

export default {
  params: ['or', 'and'],
  bind() {
    let vm = this.el
      ? this.el.__vue__
      : false

    if (!vm) {
      return
    }

    let method = this.arg
    let measurement = Object.keys(this.modifiers)[0]
    let resize = Object.keys(this.modifiers)[1] === 'resize'
    let value = this.expression
    let operator = Object.keys(this.params)[0]
    let expression = function() {
      return methods[method](value, measurement)
    }

    let vmStore = VMs[vm._uid] || (VMs[vm._uid] = {})

    operator && (vmStore.operators = operator);
    vmStore.expressions = [].concat(vmStore.expressions || [], {
      expression,
      resize
    })

    if (vmStore && vmStore.expressions) {
      vm.$on('hook:compiled', function() {
        vm.$set('mediaQuery', getMediaQuery(vm))
      })

      window.addEventListener('resize', function() {
        vm.$set('mediaQuery', getMediaQuery(vm, true))
      })
    }
  },
}

let VMs = {};

let getMediaQuery = function(vm, itResize) {
  let vmStore = VMs[vm._uid];

  if (!vmStore || !vmStore.expressions) return

  let operator = '';

  let mediaQuery = vmStore.expressions.reduce((result, {expression, resize}) => {
    console.log('resize', resize);
    let expr;

    if (itResize && !resize) {
      expr = result !== undefined
        ? result
        : undefined
    } else if (result === undefined) {
      expr = expression()
    } else if (operator) {
      expr = operator === 'or'
        ? (result || expression())
        : operator === 'and'
          ? (result && expression())
          : result

      operator = '';
    } else {
      expr = expression()
    }

    operator = vmStore.operators

    console.log('expr', expr);
    return expr;
  }, undefined)

  console.log('mediaQuery', mediaQuery);

  return mediaQuery !== undefined
    ? mediaQuery
    : vm.mediaQuery
}

// METHODS

let prepare = function(val) {
  return ('' + parseInt(val)).length === ('' + val).length
    ? `${val}px`
    : val
}

let below = function(value, measurement = 'width') {
  return matchMedia(`(max-${measurement}: ${prepare(value)})`).matches
}

let above = function(value, measurement = 'width') {
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
