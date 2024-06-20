import { NotFoundError } from "../Helpers/errors";
import { Event, EventInterface } from "../schemas/Event";
import { EventInput, EventQuery } from "../types/EventType";
import { findById as findCategoryById } from "./CategoryService";
import { checkImage } from "./ImageService";
import { findById as findTalentById } from "./TalentService";

export const findAll = async (keyword: EventQuery): Promise<EventInterface[]> => {
    const { title, category, talent } = keyword;

    const filter: { [key: string]: any } = {
        ...(title && {
            title: { $regex: title, $options: 'i' }
        }),
        ...(category && { category }),
        ...(talent && { talent }),
    };

    const events = await Event.find(filter)
        .populate({
            path: 'image',
            select: 'id name'
        })
        .populate({
            path: 'category',
            select: 'id name'
        })
        .populate({
            path: 'talent',
            select: 'id name role image',
            populate: {
                path: 'image',
                select: 'id name'
            }
        });

    return events;
}

export const create = async (payload: EventInput): Promise<EventInterface> => {
    const event = new Event(payload);

    if (payload.image) await checkImage(payload.image);
    if (payload.category) await findCategoryById(payload.category);
    if (payload.talent) await findTalentById(payload.talent);

    await event.save();

    return event;
}

export const findById = async (id: string): Promise<EventInterface | null> => {
    const event = await Event.findById(id)
        .populate({
            path: 'image',
            select: 'id name'
        })
        .populate({
            path: 'category',
            select: 'id name'
        })
        .populate({
            path: 'talent',
            select: 'id name role image',
            populate: {
                path: 'image',
                select: 'id name'
            }
        }).exec();

    console.log(event);

    if (!event) throw new NotFoundError('Event not found with id : ' + id);

    return event;
}

export const update = async (id: string, values: EventInput): Promise<EventInterface> => {
    if (values.image) await checkImage(values.image);
    if (values.category) await findCategoryById(values.category);
    if (values.talent) await findTalentById(values.talent);

    const result = await Event.findByIdAndUpdate(id, values,
        {
            new: true,
            runValidators: true
        }).exec();

    if (!result) throw new NotFoundError('Event not found with id : ' + id);

    return result;
}

export const remove = async (id: string): Promise<EventInterface> => {
    const event = await Event.findByIdAndDelete(id);

    if (!event) throw new NotFoundError('Event not found with id : ' + id);

    return event;
}