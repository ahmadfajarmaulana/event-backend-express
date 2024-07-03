import { NextFunction, Request, Response } from "express";
import { createUserAdmin, createUserOrganizer } from "../services/UserService";
import { OrganizerInput } from "../types/UserType";


export const createOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizerInput: OrganizerInput = req.body;
        const organizer = await createUserOrganizer(organizerInput);

        return res.status(201).json({
            message: "Organizer created",
            data: organizer
        });
    } catch (error) {
        next(error)
    }
}

export const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const adminInput: OrganizerInput = req.body;
        const organizer = await createUserAdmin(adminInput, req.user);

        return res.status(201).json({
            message: "Organizer created",
            data: organizer
        });
    } catch (error) {
        next(error)
    }
}