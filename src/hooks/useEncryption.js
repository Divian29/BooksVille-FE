import CryptoJS from "crypto-js";

// export const useEncryption = (text) => {
//     const key = import.meta.env.VITE_ENCRYPTION_KEY;
//
//     return CryptoJS.AES.encrypt(
//         JSON.stringify(text),
//         key
//     ).toString()
// }

export const useEncryption = (text) => {
    const key1 = import.meta.env.VITE_ENCRYPTION_KEY;
    const data = text;
    const key = CryptoJS.enc.Latin1.parse(key1);
    const iv = CryptoJS.enc.Latin1.parse(key1);
    const encrypted = CryptoJS.AES.encrypt(
        data,
        key,
        {
            iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding
        });

    return encrypted
}