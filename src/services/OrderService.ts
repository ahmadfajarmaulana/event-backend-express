import { JwtPayload } from 'src/types/JwtPayload';
import { Order } from '../schemas/Order';
import { Keyword, OrderPaginationResult } from '../types/OrderType';

export const getAllOrders = async (keyword: Keyword, auth: JwtPayload): Promise<OrderPaginationResult> => {
    const { limit = 10, page = 1, startDate, endDate } = keyword;
    let condition = {};

    if (auth.role !== 'owner') {
        condition = { ...condition, 'historyEvent.organizer': auth.organizer };
    }

    if (startDate && endDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59);
        condition = {
            ...condition,
            date: {
                $gte: start,
                $lte: end,
            },
        }
    }

    const result = await Order.find(condition)
        .limit(limit)
        .skip(limit * (page - 1));

    const count = await Order.countDocuments(condition);

    return {
        data: result,
        pages: Math.ceil(count / limit),
        total: count,
    };
}
