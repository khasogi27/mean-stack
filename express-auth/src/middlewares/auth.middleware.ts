import jwt from 'jsonwebtoken';

const jwtSecret: string = process.env.JWT_SECRET || '';

export const creteJwt = (req: any, res: any, next: any) => {
 try {
  const token = req.headers.authorization.replace("Bearer ", "");
  const decoded = jwt.verify(token, jwtSecret);
  req.userData = decoded;
  next();
 } catch (error) {
  return res.status(401).json({
    message: 'Authentification Failed'
  });
 }
}

// export default creteJwt;