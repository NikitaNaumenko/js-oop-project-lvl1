import BaseSchema from './schema.js';

export default class ArraySchema extends BaseSchema {
  constructor() {
    super({ type: 'array' });
  }

  sizeof(length) {
    return this.check({
      name: 'sizeof',
      message: `must be longer then ${length}`,
      func: (val) => val.length >= length,
    });
  }
}
