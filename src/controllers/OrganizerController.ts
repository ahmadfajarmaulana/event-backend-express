import { NextFunction, Request, Response } from "express";
import { createOrganizer as create } from "../services/UserService";
import { OrganizerAndUserInput } from "../types/UserType";


export const createOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizer = await create(req.body as OrganizerAndUserInput);

        return res.status(201).json({
            message: "Organizer created",
            data: organizer
        });
    } catch (error) {
        next(error)
    }
}