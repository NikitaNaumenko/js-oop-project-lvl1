export default class BaseSchema {
  constructor(options = {}) {
    this.type = options.type;
    this.checks = [];
    this.errors = {};
  }

  check(opts) {
    this.checks = [...this.checks, opts];
    return this;
  }

  isValid(val) {
    this.checks.forEach(({ name, message, func }) => {
      if (func(val)) {
        return;
      }

      this.errors[name] = message;
    });
  }
}
