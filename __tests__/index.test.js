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
