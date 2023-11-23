import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes

const rootController = (req: Request, res: Response) => {
    res.send("server is online");
};

app.get('/', rootController);

export default app;