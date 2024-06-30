import jwt from "jsonwebtoken";
import config from "../config";
import { JwtPayload } from "../types/JwtPayload";
import { UnauthorizedError } from "./errors";

export const generateToken = (payload: JwtPayload) => {
    const secret = config.jwtSecret;

    console.log(payload)

    if (!secret) throw new UnauthorizedError("Invalid credentials");

    const token = jwt.sign(payload, secret, { expiresIn: `${config.jwtAccessTokenExpired}h` });

    return token;
};

export const verifyToken = (token: string): JwtPayload => {
    const secret = config.jwtSecret;

    if (!secret) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;

    return decoded;
};