import { NotFoundError } from "../Helpers/errors";
import { Event, EventInterface } from "../schemas/Event";
import { EventInput, EventQuery } from "../types/EventType";
import { findById as findCategoryById } from "./CategoryService";
import { checkImage } from "./ImageService";
import { findById as findTalentById } from "./TalentService";

export const findAll = async (keyword: EventQuery, auth: any): Promise<EventInterface[]> => {
    const { title, category, talent } = keyword;
    let condition: EventQuery = { organizer: auth.organizer };

    if (title) {
        condition = { ...condition, title: { $regex: title, $options: 'i' } };
    }

    if (category) {
        condition = { ...condition, category: category };
    }

    if (talent) {
        condition = { ...condition, talent: talent };
    }

    const events = await Event.find(condition)
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

export const create = async (payload: EventInput, auth: any): Promise<EventInterface> => {
    const event = new Event({
        ...payload,
        organizer: auth.organizer
    });

    if (payload.image) await checkImage(payload.image);
    if (payload.category) await findCategoryById(payload.category, auth);
    if (payload.talent) await findTalentById(payload.talent);

    await event.save();

    return event;
}

export const findById = async (id: string, auth: any): Promise<EventInterface | null> => {
    const event = await Event.findOne({ _id: id, organizer: auth.organizer })
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

export const update = async (id: string, values: EventInput, auth: any): Promise<EventInterface> => {
    if (values.image) await checkImage(values.image);
    if (values.category) await findCategoryById(values.category, auth);
    if (values.talent) await findTalentById(values.talent);

    const result = await Event.findOneAndUpdate(
        { _id: id, organizer: auth.organizer },
        { ...values, organizer: auth.organizer },
        { new: true, runValidators: true })
        .exec();

    if (!result) throw new NotFoundError('Event not found with id : ' + id);

    return result;
}

export const remove = async (id: string, auth: any): Promise<EventInterface> => {
    const event = await Event
        .findOneAndDelete({ _id: id, organizer: auth.organizer })
        .exec();

    if (!event) throw new NotFoundError('Event not found with id : ' + id);

    return event;
}