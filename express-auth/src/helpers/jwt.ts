import { IUser } from '@/interfaces/user.interface';
import jwt, { JwtPayload, TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

const verifyTokenHandler = (err: VerifyErrors | null, decode: string | JwtPayload | undefined): string | JwtPayload | undefined => {
  if (err instanceof TokenExpiredError) return { expired: true };
  return decode;
}

export const verifyToken = (token: string): JwtPayload | IUser | string | any => {
  return jwt.verify(token, process.env.JWT_SECRET!, verifyTokenHandler);
}

export const signToken = (payload: any): string => jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });