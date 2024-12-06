import { Document, Schema, Types, model } from 'mongoose';

export interface OrderInterface extends Document {
    date: Date;
    personalDetail: {
        firstName: string;
        lastName: string;
        email: string;
        role: string;
    };
    status: string;
    totalPay: number;
    totalOrderTicket: number;
    orderItems: OrderDetailsInterface[];
    participant: Types.ObjectId,
    payment: Types.ObjectId,
    event: Types.ObjectId
}

export interface OrderDetailsInterface extends Document {
    ticketCategories: string;
    price: number;
    sumTicket: number;
}


const OrderDetailsSchema = new Schema({
    ticketCategories: {
        type: String,
        ref: 'Category',
        required: [true, 'Tipe tiket wajib di isi'],
    },
    price: {
        type: Number,
        default: 0,
    },
    sumTicket: {
        type: Number,
        required: true,
    }
});

const OrderSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    personalDetail: { 
        firstName: {
            type: String,
            required: [true, 'please provide firstName'],
            minlength: 3,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: [true, 'please provide lastName'],
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'please provide email'],
        },
        role: {
            type: String,
            default: 'designer',
        }
    },
    status:{
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    },
    totalPay: {
        type: Number,
        required: true,
    },
    totalOrderTicket: {
        type: Number,
        required: true,
    },
    orderItems: [OrderDetailsSchema],
    participant: {
        type: Types.ObjectId,
        ref: 'Participant',
        required: true,
    },
    payment: {
        type: Types.ObjectId,
        ref: 'Payment',
        required: true,
    },
    event: {
        type: Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    historyEvent: {
        organizer: {
            type: Types.ObjectId,
            ref: 'Organizer',
            required: true,
        }
    }
},{
    timestamps: true
});

export const Order = model<OrderInterface>("Order", OrderSchema);

