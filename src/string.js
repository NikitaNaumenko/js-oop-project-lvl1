import BaseSchema from './schema.js';

export default class StringSchema extends BaseSchema {
  constructor() {
    super({ type: 'string' });
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

  static isPresent(value) {
    return value && value.trim().length > 0;
  }
}
