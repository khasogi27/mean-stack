import express, { Express } from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors';
import auth from '@/routers/auth.routes';
import validEnv from '@/utils/validEnv';

dotenv.config();
validEnv();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', auth);

export default app;