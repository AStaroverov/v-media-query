import mediaBreakpoints from 'mediaBreakpoints';

export default {
  params: ['or', 'and'],
  bind() {
    let vm = this.el
      ? this.el.__vue__
      : false;

    if (!vm) {
      return;
    }

    let method = this.arg;
    let measurement = Object.keys(this.modifiers)[0];
    let value = this.expression;
    let result = mediaBreakpoints[method](value, measurement);
    let operator = vm.__mediaQueryLastOperator;

    if (vm.mediaQuery !== undefined) {
      result = operator === 'or'
        ? vm.mediaQuery || result
        : operator === 'and'
          ? vm.mediaQuery && result
          : result;
    }

    vm.__mediaQueryLastOperator = Object.keys(this.params)[0];
    vm.$set('mediaQuery', result);

  },
};

// METHODS

let prepare = function(val) {
  return ('' + parseInt(val)).length === ('' + val).length
    ? `${val}px`
    : val;
};

mediaBreakpoints.below = function(value, measurement = 'width') {
  return matchMedia(`(max-${measurement}: ${prepare(value)})`).matches;
};

mediaBreakpoints.above = function(value, measurement = 'width') {
  return matchMedia(`(min-${measurement}: ${prepare(value)})`).matches;
};

mediaBreakpoints.between = function(minAndMax, measurement = 'width') {
  let [minVal, maxVal] = JSON.parse(minAndMax);

  return matchMedia(`(
    min-${measurement}: ${prepare(minVal)})
    and
    (max-${measurement}: ${prepare(maxVal)}
  )`).matches;
};
