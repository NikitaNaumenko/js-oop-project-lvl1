import StringSchema from './string.js';

export default class Validator {
  constructor() {
    this.checker = null;
  }

  string() {
    this.checker = new StringSchema();
    return this.checker;
  }
}
