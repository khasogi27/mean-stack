import express, { Express } from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors';
import { validEnv } from '@/utils/index.util';
import indexRoute from '@/routers/index.route';

dotenv.config();
validEnv();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRoute);

export default app;