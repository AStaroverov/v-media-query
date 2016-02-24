// div v-mq:above.width.resize="100"

export default {
  params: ['or', 'and'],
  bind() {
    debugger
    let vm = this.el
      ? this.el.__vue__
      : false

    if (!vm) {
      return
    }

    let method = this.arg
    let measurement = Object.keys(this.modifiers)[0]
    let resize = Object.keys(this.modifiers)[1]
    let value = this.expression
    let getResult = function() {
      return [method](value, measurement)
    }
    let operator = Object.keys(this.params)[0]

    if (operator) {
      vm.__mediaQuery$operator = operator
    }

    vm.__mediaQuery$expressions = [].concat(vm.__mediaQueryExpressions || [], getResult)

    if (!vm.__mediaQuery$getResult) {
      vm.__mediaQuery$getResult = function() {
        return vm.__mediaQuery$expressions.reduce((result, expression) => {
          if (result === undefined) {
            return expression
          } else if (vm.__mediaQuery$operator) {
            return  vm.__mediaQuery$operator === 'or'
                ? result || vm.mediaQuery
                : operator === 'and'
                  ? result && vm.mediaQuery
                  : result
          } else {
            return expression
          }
        }, undefined)
      }

      vm.on('hook:init', function() {
        debugger
        vm.$set('$mediaQuery', vm.__mediaQuery$getResult())
      })
      document.addEventListener('resize', function() {
        debugger
        vm.$set('$mediaQuery', vm.__mediaQuery$getResult())
      })
    }

    // if (vm.mediaQuery !== undefined) {
    //   result = operator === 'or'
    //     ? vm.mediaQuery || result
    //     : operator === 'and'
    //       ? vm.mediaQuery && result
    //       : result
    // }
    //
    // vm.__mediaQueryLastOperator =
    // vm.$set('mediaQuery', result)
  },
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
