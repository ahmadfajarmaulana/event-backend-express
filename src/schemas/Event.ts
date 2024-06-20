import { Document, Schema, Types, model } from 'mongoose';

// Interface for Ticket Category
export interface TicketCategoryInterface extends Document {
    type: string;
    price: number;
    stock: number;
    statusTicketCategories: boolean;
    expired?: Date;
}

// Ticket Category Schema
const TicketCategoriesSchema = new Schema<TicketCategoryInterface>({
    type: {
        type: String,
        required: [true, 'Type is required'],
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    statusTicketCategories: {
        type: Boolean,
        default: true,
    },
    expired: {
        type: Date,
    },
});

// Interface for Event
export interface EventInterface extends Document {
    title: string;
    date: Date;
    about?: string;
    tagline: string;
    keyPoint?: string[];
    venueName: string;
    statusEvent: 'Draft' | 'Published';
    tickets: TicketCategoryInterface[];
    image: Types.ObjectId;
    category: Types.ObjectId;
    talent: Types.ObjectId;
}

// Event Schema
const EventSchema = new Schema(
    {
        title: {
            type: String,
            unique: true,
            required: [true, 'Title is required'],
            minlength: 3,
            maxlength: 50,
        },
        date: {
            type: Date,
            required: [true, 'Date is required'],
        },
        about: {
            type: String,
        },
        tagline: {
            type: String,
            required: [true, 'Tagline is required'],
        },
        keyPoint: {
            type: [String],
        },
        venueName: {
            type: String,
            required: [true, 'VenueName is required'],
        },
        statusEvent: {
            type: String,
            enum: ['Draft', 'Published'],
            default: 'Draft',
        },
        tickets: {
            type: [TicketCategoriesSchema],
            required: true,
        },
        image: {
            type: Types.ObjectId,
            ref: 'Image',
            required: true,
        },
        category: {
            type: Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        talent: {
            type: Types.ObjectId,
            ref: 'Talent',
            required: true,
        },
    },
    { timestamps: true }
);

export const Event = model<EventInterface>('Event', EventSchema);
