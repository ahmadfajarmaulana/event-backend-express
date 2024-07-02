import { NextFunction, Request, Response } from "express";
import { create, findAll, findById, remove, update } from "../services/CategoryService";


export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await create(req.body, req.user);

        return res.status(201).json({
            message: "Category created",
            data: category
        });
    } catch (error) {
        next(error)
    }
}

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await findAll(req.user);

        return res.status(200).json({
            message: "All categories",
            data: categories
        });
    } catch (error) {
        next(error)
    }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await findById(id, req.user);

        return res.status(200).json({
            message: "Category found",
            data: category
        });
    } catch (error) {
        next(error)
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const result = await update(id, req.body, req.user);

        return res.status(200).json({
            message: "Category updated",
            data: result
        });

    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await remove(id, req.user);

        return res.status(200).json({
            message: "Category deleted",
            data: result
        });
    } catch (error) {
        next(error)
    }
}