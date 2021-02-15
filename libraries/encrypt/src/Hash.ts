import { compare, genSaltSync, hashSync } from 'bcryptjs';

const Hash = {
  /**
   * Creates hash for informed string.
   * @param payload Value to be encryped.
   * @returns Hash (string) of the informed value.
   */
  async generateHash(payload: string): Promise<string> {
    const salt = genSaltSync(12);
    return hashSync(payload, salt);
  },

  /**
   * Compares key and hash.
   * @param payload Raw value.
   * @param hashed Hash value.
   * @returns Promise that returns boolean.
   */
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  },
};

export default Hash;
