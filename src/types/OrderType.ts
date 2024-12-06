import { OrderInterface } from "../schemas/Order";

export type Keyword = {
    limit?: number;
    page?: number;
    startDate?: string;
    endDate?: string;
};

export type OrderPaginationResult = {
    data: OrderInterface[];
    pages: number;
    total: number;
};