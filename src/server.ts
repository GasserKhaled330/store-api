import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import productRouter from './routes/productRoute';
import userRouter from './routes/UserRoute';
import authRouter from './routes/authRoute';
const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;

dotenv.config();

app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${PORT}`
  })
);

// Initialise all the routers
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/', authRouter);
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log(`starting app on: http://localhost:${PORT}/`);
});

export default app;
