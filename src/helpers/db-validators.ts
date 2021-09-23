import User from '../models/user';

const emailExist = async (email = '') => {
  const emailExist = await User.findOne({
    email,
  });

  if (emailExist) {
    throw new Error(`El email ${email} exists`);
  }
};

export { emailExist };
