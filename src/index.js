import StringSchema from './string.js';
import ArraySchema from './array.js';
import NumberSchema from './number.js';
import ObjectSchema from './object.js';

export default class Validator {
  constructor() {
    this.checker = null;
    this.custom = {
      string: [],
      number: [],
      array: [],
      object: [],
    };
  }

  string() {
    this.checker = new StringSchema();
    this.registerCustomValidatorToSchema(this.checker);
    return this.checker;
  }

  number() {
    this.checker = new NumberSchema();
    this.registerCustomValidatorToSchema(this.checker);
    return this.checker;
  }

  array() {
    this.checker = new ArraySchema();
    this.registerCustomValidatorToSchema(this.checker);
    return this.checker;
  }

  object() {
    this.checker = new ObjectSchema();
    this.registerCustomValidatorToSchema(this.checker);
    return this.checker;
  }

  addValidator(type, name, fn) {
    this.custom[type] = [...this.custom[type], [name, fn]];
  }

  registerCustomValidatorToSchema(schema) {
    const customValidators = this.custom[schema.type];
    customValidators.forEach(([name, fn]) => {
      schema.registerCustomValidator(name, fn);
    });
  }
}
