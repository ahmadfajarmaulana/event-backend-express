import { NextFunction, Request, Response } from 'express';
import { create, findAll, findById, remove, update } from '../services/TalentService';
import { TalentInput } from '../types/TalentType';

export const getAllTalents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const talents = await findAll(req.query.keyword as string);
        return res.status(200).json({
            message: "All talents",
            data: talents
        });
    } catch (error) {
        next(error);
    }
}

export const getTalentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const talent = await findById(id);
        return res.status(200).json({
            message: "Talent found",
            data: talent
        });
    } catch (error) {
        next(error);
    }
}

export const createTalent = async (req: Request, res: Response, next: NextFunction) => {
    const payload: TalentInput = req.body;
    try {
        const talent = await create(payload);
        return res.status(201).json({
            message: "Talent created",
            data: talent
        });
    } catch (error) {
        next(error);
    }
}

export const updateTalent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload: TalentInput = req.body;
        const talent = await update(id, payload)
        return res.status(201).json({
            message: "Talent updated",
            data: talent
        });
    } catch (error) {
        next(error);
    }
}

export const deleteTalent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const talent = await remove(id);
        return res.status(200).json({
            message: "Talent deleted",
            data: talent
        });
    } catch (error) {
        next(error);
    }
}