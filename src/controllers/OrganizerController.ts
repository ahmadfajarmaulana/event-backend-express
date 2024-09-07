import { NextFunction, Request, Response } from "express";
import { createUserAdmin, createUserOrganizer, findAllUsers } from "../services/UserService";
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

export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await findAllUsers();

        return res.status(200).json({
            message: 'All Users',
            data: users
        })
    } catch (error) {
        next(error)
    }
}
