import { cleanEnv, port, str }  from 'envalid';

export const validEnv = (): void => {
  cleanEnv(process.env, { NODE_ENV: str(), PORT: port() });
}
