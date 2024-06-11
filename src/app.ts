import express, { Request, Response } from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());
app.post('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
export default app;
