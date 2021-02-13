import { compare, genSaltSync, hashSync } from 'bcryptjs';

const Encrypt = {
  /**
   * Cria hash para uma string.
   * @param payload Valor para ser encriptado.
   * @returns Hash (string) para o valor informado.
   */
  async generateHash(payload: string): Promise<string> {
    const salt = genSaltSync(12);
    return hashSync(payload, salt);
  },

  /**
   * Comapara chave e hash.
   * @param payload Valor sem ser encriptado.
   * @param hashed valor encriptado
   * @returns Promise com um booleano.
   */
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  },
};

export default Encrypt;
