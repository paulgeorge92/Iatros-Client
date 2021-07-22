import { AES, SHA3 } from 'crypto-js';

module Encrypt {
  export function createHash(message: string) {
    return SHA3(message, { outputLength: 224 }).toString(CryptoJS.enc.Hex);
  }

  export function encrypt(message: string, hash: string) {
    return AES.encrypt(message, hash);
  }

  export function descrypt(cipher: string, hash: string) {
    return AES.decrypt(cipher, hash);
  }
}
