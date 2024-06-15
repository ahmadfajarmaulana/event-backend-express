import { NextFunction, Request, Response } from "express";
import { upload } from "../services/ImageService";


export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const file = req.file as Express.Multer.File;
        const result = await upload(file);

        return res.status(201).json({ message: "Image uploaded", data: result });
    } catch (error) {
        next(error);
    }
}