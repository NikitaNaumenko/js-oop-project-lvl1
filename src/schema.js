import _ from 'lodash';

export default class BaseSchema {
  constructor(options = {}) {
    this.type = options.type;
    this.checks = [];
    this.errors = {};
  }

  required() {
    return this.check({
      name: 'required',
      message: 'value is required',
      func: (val) => this.isPresent(val),
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
}
