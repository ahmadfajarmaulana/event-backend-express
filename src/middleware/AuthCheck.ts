import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../Helpers/Generate';
import { UnauthenticatedError } from '../Helpers/errors';
import { JwtPayload } from '../types/JwtPayload';

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const AuthCheck = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) throw new UnauthenticatedError("Authentication invalid");

        const decoded = verifyToken(token);

        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};

export const AuthCheckRole = (roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new UnauthenticatedError("You are not authorized to access this route");
        }

        next();
    }
}