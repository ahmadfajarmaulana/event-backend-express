import { Document, Schema, Types, model } from 'mongoose';

export interface Icategory extends Document {
    _id: Types.ObjectId;
    name: string;
}

const CategorySchema = new Schema({
    name: { 
        type: String,
        unique: true,
        minlength: [3, 'Category name must be at least 3 characters long'],
        maxlength: [20, 'Category name must be at most 20 characters long'],
        required: [true, 'Category name is required'],
    },
},{
    timestamps: true
});

export const Category = model<Icategory>("Category", CategorySchema);

