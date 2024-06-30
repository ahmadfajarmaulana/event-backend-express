import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../schemas/User";
import { signIn } from "../services/AuthSerive";
import { createUser } from "../services/UserService";
import { UserInput } from "../types/UserType";


export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body as UserInput;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await createUser({ name, email, password: hashedPassword } as IUser);

        return res.status(200).json({ message: "Register", data: newUser });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        const result = await signIn(email, password)
        res.status(200).json({
            message: 'Login Success',
            token: result
        })
    } catch (error) {
        next(error)
    }
}
