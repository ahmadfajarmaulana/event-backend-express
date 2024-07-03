import { Document, Schema, Types, model } from 'mongoose';

export interface TalentInterface extends Document {
    _id: Types.ObjectId;
    name: string;
    role: string;
    image: Types.ObjectId;
    organizer: Types.ObjectId;
}

const TalentSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Talent name is required'],
    },
    role: {
        type: String,
        default: '-',
    },
    image: {
        type: Types.ObjectId,
        ref: 'Image',
        required: [true, 'Image id is required']
    },
    organizer: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Organizer id is required']
    }
}, {
    timestamps: true
});

export const Talent = model<TalentInterface>("Talent", TalentSchema);

