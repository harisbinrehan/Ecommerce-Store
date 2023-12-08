import jwt from 'jsonwebtoken';
import { PASSPORT_SECRET_KEY } from '../config/config';

export const GenerateToken = (email) => {
  const token = jwt.sign({ email }, PASSPORT_SECRET_KEY, { expiresIn: '10000s' });
  return token;
};
