import { Document, Schema, Types, model } from 'mongoose';

export interface OrganizerInterface extends Document {
    _id: Types.ObjectId;
    name: string;
}

const OrganizerSchema = new Schema<OrganizerInterface>({
    name: {
        type: String,
        unique: true,
        required: [true, 'Organizer name is required'],
    }
}, {
    timestamps: true
});

export const Organizer = model<OrganizerInterface>("Organizer", OrganizerSchema);