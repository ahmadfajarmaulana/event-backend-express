import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import config from './config';
import { notFound } from './middleware/not-found';
import routes from './routes';

import errorHandlerMiddleware from './middleware/handler-error';

dotenv.config();
const app: Express = express();
const port: string = process.env.PORT || "3000";

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(routes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const mongoURI = config.mongoURI;

mongoose.connect(mongoURI).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.error("MongoDB connection error:", err);
});

app.get('/', (_req: Request, res: Response) => {
    res.send('express + typescript server is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});