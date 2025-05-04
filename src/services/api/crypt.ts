import CryptoJS from "crypto-js";

const basekeyString = "rozemoon12345678901234567890123456";
const keyString = basekeyString.padEnd(32).slice(0, 32);
const baseivString = "16charlongivvalue";
const ivString = baseivString.padEnd(16).slice(0, 16);

const key = CryptoJS.enc.Utf8.parse(keyString);
const iv = CryptoJS.enc.Utf8.parse(ivString);

export function encryptData(plainText: string) {
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export function decryptData(cipherText: string) {
  const encryptedHexStr = CryptoJS.enc.Base64.parse(cipherText);
  const encryptedBase64 = CryptoJS.lib.CipherParams.create({ ciphertext: encryptedHexStr });

  const decrypted = CryptoJS.AES.decrypt(encryptedBase64, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

  return decrypted.toString(CryptoJS.enc.Utf8);
}
