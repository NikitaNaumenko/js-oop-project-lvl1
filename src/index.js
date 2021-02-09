import StringSchema from './string.js';
import NumberSchema from './number.js';

export default class Validator {
  constructor() {
    this.checker = null;
  }

  string() {
    this.checker = new StringSchema();
    return this.checker;
  }

  number() {
    this.checker = new NumberSchema();
    return this.checker;
  }

}
