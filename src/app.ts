import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source'; 
import router from './routes/index.routes';
import 'reflect-metadata';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('DataSource initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json(err.message);
});

app.listen(PORT, () => {
  console.log(PORT, '번 포트로 서버 실행');
});