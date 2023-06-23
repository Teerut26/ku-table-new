import { Crypt } from 'hybrid-crypto-js';

export const RSAEncrypt = (message: string) => {
  const crypt = new Crypt({
    rsaStandard: 'RSA-OAEP',
  });

  return Buffer.from(
    crypt.encrypt(
      process.env.NEXT_PUBLIC_STORE_PASSWORD_KEY?.replace(/\\n/gm, '\n'),
      message
    )
  ).toString('base64');
};

export const RSADecrypt = (encrypt: string) => {
  const crypt = new Crypt({
    rsaStandard: 'RSA-OAEP',
  });

  return crypt.decrypt(
    process.env.STORE_PASSWORD_SECRET?.replace(/\\n/gm, '\n'),
    encrypt
  )?.message;
};
