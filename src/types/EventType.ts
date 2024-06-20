
export type EventQuery = {
    title?: { $regex?: string, $options?: string };
    category?: { $regex?: string, $options?: string };
    talent?: { $regex?: string, $options?: string };
}

export type TicketCategoryInput = {
    type: string;
    price: number;
    stock: number;
    statusTicketCategories: boolean;
    expired?: Date;
}

export type EventInput = {
    title: string;
    date: Date;
    about?: string;
    tagline: string;
    keyPoint?: string[];
    venueName: string;
    statusEvent: string;
    tickets: TicketCategoryInput[];
    image: string;
    category: string;
    talent: string;
}