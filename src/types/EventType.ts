
export type EventQuery = {
    title?: { $regex?: string | object, $options?: string } | string;
    category?: string;
    talent?: string;
    organizer?: string;
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