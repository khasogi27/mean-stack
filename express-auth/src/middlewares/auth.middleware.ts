import jwt, { JwtPayload } from 'jsonwebtoken';

const jwtSecret: string = process.env.JWT_SECRET || '';

export const creteJwt = (req: any, res: any, next: any) => {
 try {
  const token: string = req.headers.authorization.replace("Bearer ", "");
  const decoded: string | JwtPayload = jwt.verify(token, jwtSecret);
  req.userData = decoded;
  next();
 } catch (error) {
  return res.status(401).json({ message: 'Unauthorized' });
 }
}