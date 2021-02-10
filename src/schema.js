import _ from 'lodash';

export default class BaseSchema {
  constructor(options = {}) {
    this.type = options.type;
    this.checks = [];
    this.errors = {};
    this.customValidators = {};
  }

  required() {
    return this.check({
      name: 'required',
      message: 'value is required',
      func: (val) => this.constructor.isPresent(val),
    });
  }

  check(opts) {
    this.checks = [...this.checks, opts];
    return this;
  }

  isValid(val) {
    this.errors = {};
    this.checks.forEach(({ name, message, func }) => {
      if (func(val)) {
        return;
      }

      this.errors[name] = message;
    });

    return _.isEmpty(this.errors);
  }

  registerCustomValidator(name, fn) {
    this.customValidators[name] = fn;
  }

  test(validatorName, ...args) {
    return this.check({
      name: validatorName,
      func: (val) => this.customValidators[validatorName](val, ...args),
    });
  }

  static isPresent(value) {
    return !_.isNil(value);
  }
}
