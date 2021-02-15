import crypto from 'crypto';

// This is how to generate keys
// console.log({
//   ENCRYPTION_TRANSFORMER_KEY: crypto.randomBytes(16).toString('hex'),
//   ENCRYPTION_TRANSFORMER_IV: crypto.randomBytes(8).toString('hex'),
// });

export const encrypt = (value: string): string => {
  const ENC_KEY = `${process.env.ENCRYPTION_TRANSFORMER_KEY}`;
  const IV = `${process.env.ENCRYPTION_TRANSFORMER_IV}`;

  if (!ENC_KEY || !IV) throw new Error('ENC_KEY or IV not found');

  const cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  const encrypted = cipher.update(value, 'utf8', 'base64');

  return encrypted + cipher.final('base64');
};

export const decrypt = (encrypted: string): string => {
  const ENC_KEY = `${process.env.ENCRYPTION_TRANSFORMER_KEY}`;
  const IV = `${process.env.ENCRYPTION_TRANSFORMER_IV}`;

  if (!ENC_KEY || !IV) throw new Error('ENC_KEY or IV not found');

  const decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
  const decrypted = decipher.update(encrypted, 'base64', 'utf8');

  return decrypted + decipher.final('utf8');
};

const ColumnEncryptionTransformer = {
  from: (value: string): string => decrypt(value),
  to: (value: string): string => encrypt(value),
};

export default ColumnEncryptionTransformer;
