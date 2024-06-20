import { NextFunction, Request, Response } from 'express';
import { create, findAll, findById, remove, update } from '../services/EventService';
import { EventInput, EventQuery } from '../types/EventType';

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    const filter: EventQuery = req.query;
    try {
        const events = await findAll(filter);
        return res.status(200).json({
            message: "All Events",
            data: events
        });
    } catch (error) {
        next(error);
    }
}

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const event = await findById(id);
        return res.status(200).json({
            message: "Event found",
            data: event
        });
    } catch (error) {
        next(error);
    }
}

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    const payload: EventInput = req.body;
    try {
        const event = await create(payload);
        return res.status(201).json({
            message: "Event created",
            data: event
        });
    } catch (error) {
        next(error);
    }
}

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const payload: EventInput = req.body;
        const event = await update(id, payload)
        return res.status(201).json({
            message: "Event updated",
            data: event
        });
    } catch (error) {
        next(error);
    }
}

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const event = await remove(id);
        return res.status(200).json({
            message: "Event deleted",
            data: event
        });
    } catch (error) {
        next(error);
    }
}