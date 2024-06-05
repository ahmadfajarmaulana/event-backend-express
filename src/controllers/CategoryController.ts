import { Request, Response } from "express";
import { Icategory } from "src/schemas/Category";
import { CategoryInput } from "src/types/CategoryType";
import { create, findAll, findById, remove, update } from "../services/CategoryService";


export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body as CategoryInput;
        const category = await create({ name } as Icategory);

        return res.status(201).json({ 
            message: "Category created",
            data: category 
        });
    } catch (error) {
        console.error('Error during category creation:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getAllCategories = async (req: Request, res: Response) => {
    try{
        const categories = await findAll();

        return res.status(200).json({ 
            message: "All categories",
            data: categories
        });
    } catch (error) {
        console.error('Error during fetching categories:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await findById(id);

        if(!category){
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({ 
            message: "Category found",
            data: category
        });
    } catch (error) {
        console.error('Error during fetching category:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body as CategoryInput;
        const category = await findById(id);

        if(!category){
            return res.status(404).json({ message: "Category not found" });
        }

        const result = await update(id, { name } as Icategory);

        return res.status(200).json({ 
            message: "Category updated",
            data: result
        });
        
    } catch (error) {
        console.error('Error during updating category:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await remove(id);

        return res.status(200).json({ 
            message: "Category deleted",
            data: result
        });
    } catch (error) {
        console.error('Error during deleting category:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}