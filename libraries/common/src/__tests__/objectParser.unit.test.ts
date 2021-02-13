import { objectParser } from '../index';

const obj = {
  message: 'Hello World',
};
const stringifiedObject = JSON.stringify(obj);

describe('[COMMON] ObjectParser', () => {
  it('Should parse a string', () => {
    const res: any = objectParser(stringifiedObject);

    expect(res.message).toBe(obj.message);
  });

  it('Should return empty value if stringObject has no value', () => {
    const res: any = objectParser('');

    expect(typeof res).toBe('object');
  });
});
