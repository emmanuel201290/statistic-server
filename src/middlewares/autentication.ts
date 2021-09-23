import { request } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req = request, res: any, next: any) => {
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({
      msg: 'there is not token in the request',
    });
  }

  try {
    jwt.verify(token, process.env.SEED || '');
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};
