import { BadRequestError, NotFoundError } from "../Helpers/errors";
import { Talent, TalentInterface } from "../schemas/Talent";
import { TalentInput } from "../types/TalentType";
import { checkImage } from "./ImageService";

export const findAll = async (keyword: string, auth: any): Promise<TalentInterface[]> => {
    let filter: any = { organizer: auth.organizer };

    if (keyword) {
        filter = {
            ...filter,
            name: { $regex: keyword as string, $options: "i" }
        }
    }

    console.log(filter);
    const talents = await Talent.find(filter)
        .populate({
            path: 'image',
            select: 'id name'
        })
        .select('id name role image').exec();

    return talents;
}

export const create = async (values: TalentInput, auth: any): Promise<TalentInterface> => {
    const talent = new Talent({
        ...values,
        organizer: auth.organizer
    });

    if (values.image) await checkImage(values.image);

    const checkName = await Talent.findOne({ name: values.name, organizer: auth.organizer });

    if (checkName) throw new BadRequestError('Talent name already exists');

    await talent.save();

    return talent;
}

export const findById = async (id: string, auth: any): Promise<TalentInterface | null> => {
    const talent = await Talent.findOne({ _id: id, organizer: auth.organizer })
        .populate({
            path: 'image',
            select: 'id name'
        })
        .select('id name role image').exec();

    if (!talent) throw new NotFoundError('Talent not found with id : ' + id);

    return talent;
}

export const update = async (id: string, values: TalentInput, auth: any): Promise<TalentInterface> => {
    if (values.image) await checkImage(values.image);

    const result = await Talent.findOneAndUpdate(
        { _id: id, organizer: auth.organizer },
        { ...values, organizer: auth.organizer },
        { new: true, runValidators: true })
        .exec();

    if (!result) throw new NotFoundError('Talent not found with id : ' + id);

    return result;
}

export const remove = async (id: string, auth: any): Promise<TalentInterface> => {

    const result = await Talent.findOneAndDelete({ id, organizer: auth.organizer }).exec();

    if (!result) throw new NotFoundError('Talent not found with id : ' + id);

    return result;
}