import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(+process.env.SALT!);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export const comparePassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
}