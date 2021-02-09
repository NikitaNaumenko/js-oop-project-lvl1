import BaseSchema from './schema.js';

export default class NumberSchema extends BaseSchema {
  constructor() {
    super({ type: 'number' });
  }

  positive() {
    return this.check({
      name: 'positive',
      message: 'must be greater then zero',
      func: (val) => val > 0,
    });
  }

  range(min, max) {
    return this.check({
      name: 'range',
      message: `must include in range ${min}-${max}`,
      func: (val) => val >= min && val <= max,
    });
  }
}
