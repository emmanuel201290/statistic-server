import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
  console.log('uid es: ', uid);
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SEED || '',
      {
        expiresIn: '4h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Cannot generate token ');
        } else {
          resolve(token);
        }
      }
    );

    console.log(payload);
  });
};
