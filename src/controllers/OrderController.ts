import { NextFunction, Request, Response } from "express";
import { getAllOrders } from "../services/OrderService";
import { JwtPayload } from "../types/JwtPayload";


export const index = async (req: Request, res: Response, next: NextFunction) => {
    const { limit = 10, page = 1, startDate, endDate } = req.query;
    const auth = req.user as JwtPayload;
    const startDateString = typeof startDate === 'string' ? startDate : undefined;
    const endDateString = typeof endDate === 'string' ? endDate : undefined;
    
    try {
        const order = await getAllOrders({
            limit: parseInt(limit as string),
            page: parseInt(page as string),
            startDate: startDateString,
            endDate: endDateString,
        }, auth);

        return res.status(200).json({
            message: "Order list",
            data: order.data,
            pages: order.pages,
            total: order.total,
        });
    } catch (error) {
        next(error);
    }
}