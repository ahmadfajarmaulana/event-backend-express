import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

//type wrong custom error definition if needed
interface CustomError extends Error {
    statusCode?: number;
    code?: number;
    keyValue?: any;
    value?: any;
    errors?: any;
}

const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    let customError = {
        // Set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong. Try again later',
    };

    // Error validation from mongoose
    if (err.name === 'ValidationError' && err.errors) {
        customError.message = Object.values(err.errors)
            .map((item: any) => item.message)
            .join(', ');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // Error code duplicate from mongoose/mongodb
    if (err.code === 11000 && err.keyValue) {
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue).join(', ')} field, please choose another value`;
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }

    // Error cast from mongoose
    if (err.name === 'CastError' && err.value) {
        customError.message = `No item found with id: ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandlerMiddleware;
