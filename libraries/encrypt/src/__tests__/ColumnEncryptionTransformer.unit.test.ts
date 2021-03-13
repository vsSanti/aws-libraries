import { decrypt, encrypt } from '../ColumnEncryptionTransformer';
import { ColumnEncryptionTransformer } from '../index';

describe('[ENCRYPT] ColumnEncryptionTransformer', () => {
  it('Should test decrypt and encrypt functions', () => {
    const sentence = 'Ínicio ação';
    const enc = encrypt(sentence);
    const dec = decrypt(enc);

    expect(enc).not.toBe(sentence);
    expect(dec).toBe(sentence);
  });

  it('Should encrypt and decrypt based on ColumnEncryptionTransformer', () => {
    const sentence = 'Ínicio ação';

    const transformer = ColumnEncryptionTransformer;

    const enc = transformer.to(sentence);
    const dec = transformer.from(enc);

    expect(enc).not.toBe(sentence);
    expect(dec).toBe(sentence);
  });

  it('Should encrypt if value is null', () => {
    const transformer = ColumnEncryptionTransformer;

    const enc = transformer.to(null);
    const dec = transformer.from(null);

    expect(enc).toBe(null);
    expect(dec).toBe(null);
  });

  it('Should encrypt if value is undefined', () => {
    const transformer = ColumnEncryptionTransformer;

    const enc = transformer.to(undefined);
    const dec = transformer.from(undefined);

    expect(enc).toBe(null);
    expect(dec).toBe(null);
  });

  it('Should throw error if ENC_KEY or IV is not found', () => {
    process.env.ENCRYPTION_TRANSFORMER_IV = '';
    const sentence = 'Ínicio ação';

    expect.assertions(2);

    try {
      encrypt(sentence);
    } catch (error) {
      expect(true).toBe(true);
    }

    try {
      decrypt(sentence);
    } catch (error) {
      expect(true).toBe(true);
    }
  });
});
