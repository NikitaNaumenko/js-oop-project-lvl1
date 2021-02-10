import StringSchema from './string.js';
import ArraySchema from './array.js';
import NumberSchema from './number.js';
import ObjectSchema from './object.js';

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

  array() {
    this.checker = new ArraySchema();
    return this.checker;
  }

  object() {
    this.checker = new ObjectSchema();
    return this.checker;
  }
}
