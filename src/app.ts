import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import {UserRoutes} from "./routes/userRoutes"
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/users', UserRoutes);


const rootController = (req: Request, res: Response) => {
    res.send("server is online");
};

app.get('/', rootController);

export default app;