import _ from 'lodash';
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
      func: (val) => _.isEmpty(val),
    });
  }
}
