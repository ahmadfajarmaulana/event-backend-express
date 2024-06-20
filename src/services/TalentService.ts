import { BadRequestError, NotFoundError } from "../Helpers/errors";
import { Talent, TalentInterface } from "../schemas/Talent";
import { TalentInput, TalentQuery } from "../types/TalentType";
import { checkImage } from "./ImageService";

export const findAll = async (keyword?: string): Promise<TalentInterface[]> => {
    let filter: TalentQuery = {};

    if (keyword) {
        filter = {
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

export const create = async (values: TalentInput): Promise<TalentInterface> => {
    const talent = new Talent(values);

    if (values.image) await checkImage(values.image);

    const checkName = await Talent.findOne({ name: values.name });

    if (checkName) throw new BadRequestError('Talent name already exists');

    await talent.save();

    return talent;
}

export const findById = async (id: string): Promise<TalentInterface | null> => {
    const talent = await Talent.findById(id)
        .populate({
            path: 'image',
            select: 'id name'
        })
        .select('id name role image').exec();

    if (!talent) throw new NotFoundError('Talent not found with id : ' + id);

    return talent;
}

export const update = async (id: string, values: TalentInput): Promise<TalentInterface> => {
    if (values.image) await checkImage(values.image);

    const result = await Talent.findByIdAndUpdate(
        id, values,
        {
            new: true,
            runValidators: true
        }
    ).exec();

    if (!result) throw new NotFoundError('Talent not found with id : ' + id);

    return result;
}

export const remove = async (id: string): Promise<TalentInterface> => {

    const result = await Talent.findByIdAndDelete(id).exec();

    if (!result) throw new NotFoundError('Talent not found with id : ' + id);

    return result;
}