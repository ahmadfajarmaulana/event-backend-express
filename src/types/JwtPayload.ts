import { Types } from "mongoose";

export type JwtPayload = {
    id: Types.ObjectId;
    name: string;
    email: string;
    organizer: Types.ObjectId;
    role: string;
}