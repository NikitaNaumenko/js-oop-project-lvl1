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
