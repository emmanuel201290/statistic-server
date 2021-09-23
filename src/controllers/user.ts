import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user';
import { generateJWT } from '../helpers/generate-jwt';

export const createUser = async (req: Request, res: Response) => {
  const { email, password, password2 } = req.body;
  
  if(password!==password2){
    return res.status(400).json({
      msg: 'Password do not match!!',
    });
  }

  const user: any = new User({
    email,
    password,
  });
  const salt = bcryptjs.genSaltSync();

  user.password = bcryptjs.hashSync(password, salt);
  await user.save();

  res.json({
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;

  try {
    const user: any = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'user/password are not correct',
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'user/password are not correct.',
      });
    }
    const token = await generateJWT(user.id);

    res.json({
      msg: 'Login ok',
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Talk with administrator.',
    });
  }
};
