import _ from 'lodash';
import BaseSchema from './schema.js';

export default class ObjectSchema extends BaseSchema {
  constructor() {
    super({ type: 'object' });
  }

  shape(obj) {
    this.clone = _.clone(obj);
    this.fields = Object.keys(this.clone);
  }

  isValid(obj) {
    this.errors = {};

    this.fields.forEach((field) => {
      const fieldSchema = this.clone[field];
      if (fieldSchema.isValid(obj[field])) {
        return;
      }

      this.errors[field] = fieldSchema.errors;
    });

    return _.isEmpty(this.errors);
  }
}
