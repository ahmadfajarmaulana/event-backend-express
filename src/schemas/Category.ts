import { Document, Schema, Types, model } from 'mongoose';

export interface Icategory extends Document {
    _id: Types.ObjectId;
    name: string;
    organizer: Types.ObjectId;
}

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: false,
        minlength: [3, 'Category name must be at least 3 characters long'],
        maxlength: [20, 'Category name must be at most 20 characters long'],
        required: [true, 'Category name is required'],
    },
    organizer: {
        type: Types.ObjectId,
        ref: 'Organizer',
        required: [true, 'Organizer is required']
    }
}, {
    timestamps: true
});

export const Category = model<Icategory>("Category", CategorySchema);

