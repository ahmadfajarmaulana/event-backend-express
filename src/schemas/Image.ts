import { Document, Schema, Types, model } from 'mongoose';

export interface ImageInterface extends Document {
    _id: Types.ObjectId;
    name: string;
}

const ImageSchema = new Schema({
    name: { 
        type: String
    },
},{
    timestamps: true
});

export const Image = model<ImageInterface>("Image", ImageSchema);

