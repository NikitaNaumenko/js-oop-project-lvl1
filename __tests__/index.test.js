import Validator from '../src/index.js';

describe('string', () => {
  it('without checks', () => {
    const validator = new Validator();
    const schema = validator.string();

    expect(schema.isValid('')).toBeTruthy();
  });

  it('with required', () => {
    const validator = new Validator();
    const schema = validator.string();

    schema.required();

    expect(schema.isValid('')).toBeFalsy();
    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid('123')).toBeTruthy();
  });

  it('with contains', () => {
    const validator = new Validator();
    const schema = validator.string();

    expect(schema.contains('what').isValid('what does the fox say')).toBeTruthy();
    expect(schema.contains('whatthe').isValid('what does the fox say')).toBeFalsy();
  });

  it('with minLength', () => {
    const validator = new Validator();
    const schema = validator.string();

    schema.minLength(3);

    expect(schema.isValid('12')).toBeFalsy();
    expect(schema.isValid('123')).toBeTruthy();
    expect(schema.isValid('1234')).toBeTruthy();
  });
});

describe('number', () => {
  it('with required', () => {
    const validator = new Validator();
    const schema = validator.number();

    schema.required();
    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid(1)).toBeTruthy();
  });

  it('with positive', () => {
    const validator = new Validator();
    const schema = validator.number();

    schema.positive();
    expect(schema.isValid(-1)).toBeFalsy();
    expect(schema.isValid(0)).toBeFalsy();
    expect(schema.isValid(1)).toBeTruthy();
  });

  it('with range', () => {
    const validator = new Validator();
    const schema = validator.number();

    schema.range(-5, 5);

    expect(schema.isValid(-6)).toBeFalsy();
    expect(schema.isValid(-5)).toBeTruthy();
    expect(schema.isValid(-1)).toBeTruthy();
    expect(schema.isValid(0)).toBeTruthy();
    expect(schema.isValid(1)).toBeTruthy();
    expect(schema.isValid(5)).toBeTruthy();
    expect(schema.isValid(6)).toBeFalsy();
  });
});

describe('array', () => {
  it('with required', () => {
    const validator = new Validator();
    const schema = validator.array();

    schema.required();

    expect(schema.isValid(null)).toBeFalsy();
    expect(schema.isValid([])).toBeTruthy();
    expect(schema.isValid(['string'])).toBeTruthy();
  });

  it('with sizeof', () => {
    const validator = new Validator();
    const schema = validator.array();

    schema.sizeof(2);

    expect(schema.isValid([])).toBeFalsy();
    expect(schema.isValid(['string'])).toBeFalsy();
    expect(schema.isValid(['string', 'number'])).toBeTruthy();
  });
});

describe('object', () => {
  it('check nested', () => {
    const validator = new Validator();
    const schema = validator.object();

    schema.shape({
      name: validator.string().required(),
      age: validator.number().positive(),
      properties: validator.array().sizeof(2),
    });

    const invalid = { name: '', age: -4, properties: ['longhair'] };
    const valid = { name: 'John Snow', age: 25, properties: ['sword', 'fat friend'] };
    expect(schema.isValid(invalid)).toBeFalsy();
    expect(schema.isValid(valid)).toBeTruthy();
  });
});

describe('custom', () => {
  it('custom for string', () => {
    const v = new Validator();
    const fn = (value, start) => value.startsWith(start);
    v.addValidator('string', 'startWith', fn);

    const schema = v.string().test('startWith', 'H');
    expect(schema.isValid('exlet')).toBeFalsy();
    expect(schema.isValid('Hexlet')).toBeTruthy();
  });

  it('custom for number', () => {
    const v = new Validator();
    const fn = (value, min) => value >= min;
    v.addValidator('number', 'min', fn);

    const schema = v.number().test('min', 5);
    expect(schema.isValid(4)).toBeFalsy();
    expect(schema.isValid(6)).toBeTruthy();
  });

  it('custom for array', () => {
    const v = new Validator();
    const fn = (value, max) => value.length <= max;
    v.addValidator('array', 'maxLength', fn);

    const schema = v.array().test('maxLength', 3);
    expect(schema.isValid([1, 2, 3, 4])).toBeFalsy();
    expect(schema.isValid([1, 2, 3])).toBeTruthy();
    expect(schema.isValid([1, 2])).toBeTruthy();
    expect(schema.isValid([1])).toBeTruthy();
  });
});
