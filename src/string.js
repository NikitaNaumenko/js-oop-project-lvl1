import BaseSchema from './schema.js';

export default class StringSchema extends BaseSchema {
  constructor(options = {}) {
    super({ type: 'string' });
    this.options = options;
  }

  required() {
    return this.check({
      name: 'required',
      message: 'value is required',
      func: (val) => val && val.trim().length > 0,
    });
  }

  contains(containedValue) {
    return this.check({
      name: 'contains',
      message: `must contains ${containedValue}`,
      func: (val) => val.includes(containedValue),
    });
  }

  minLength(length) {
    return this.check({
      name: 'minLength',
      message: `must be longer than ${length}`,
      func: (val) => val && val.length >= length,
    });
  }
}
