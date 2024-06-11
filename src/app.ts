import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandlers from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.post('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// global error handler
app.use(globalErrorHandlers);

// not found route
app.use(notFound);
export default app;
