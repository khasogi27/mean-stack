import jwt, { JwtPayload } from 'jsonwebtoken';

export const signToken = (payload: any): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
}

export const verifyToken = (token: string): string | JwtPayload => {
  const decode = jwt.verify(token, process.env.JWT_SECRET!);

  return decode;
}