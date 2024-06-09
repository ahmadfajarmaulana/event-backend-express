import { Request, Response } from 'express';

export const notFound = (_req: Request, res: Response) => {
    res.status(404).send({ message: 'Route does not exist' });
}