/* eslint-disable import/extensions */
// TODO: Jwt authentication
import jwt from 'jsonwebtoken';
import { MESSAGE_SUCESS } from '../module/config.js';

export const createJwt = (admin) => {
  const token = jwt.sign({
    admin,
  }, process.env.SECRET, {
    expiresIn: '7d',
  });

  return { status: 200, response: { message: MESSAGE_SUCESS.JWT_CREATED, token } };
};

export const verifyJwt = () => {
  // TODO
};
