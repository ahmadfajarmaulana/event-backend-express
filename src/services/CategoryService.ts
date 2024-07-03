import { BadRequestError, NotFoundError } from "../Helpers/errors";
import { Category, Icategory } from "../schemas/Category";
import { CategoryInput } from "../types/CategoryType";

export const create = async (value: CategoryInput, user: any): Promise<Icategory> => {
    const category = new Category({
        name: value.name,
        organizer: user.organizer
    });

    const check = await Category
        .findOne({ name: value.name, organizer: user.organizer })
        .exec();

    if (check) throw new BadRequestError('Category already exists');

    await category.save();

    return category;
}

export const findAll = async (user: any): Promise<Icategory[]> => {
    const categories = await Category
        .find({ organizer: user.organizer })
        .select({ id: 1, name: 1 })
        .exec();

    return categories;
}

export const findById = async (id: string, user: any): Promise<Icategory | null> => {
    const result = await Category
        .findOne({
            _id: id,
            organizer: user.organizer
        })
        .exec();

    if (!result) throw new NotFoundError('Category not found with this id : ' + id);

    return result;
}

export const update = async (id: string, { name }: CategoryInput, user: any): Promise<Icategory | null> => {
    const check = await Category
        .findOne({ name: name, organizer: user.organizer })
        .exec();

    if (check && check._id.toString() !== id) {
        throw new BadRequestError('Category already exists');
    }

    const result = await Category
        .findOneAndUpdate(
            {
                _id: id,
                organizer: user.organizer
            },
            { name },
            { new: true, runValidators: true }
        ).exec();

    if (!result) throw new NotFoundError('Category not found with this id : ' + id);

    return result;
}

export const remove = async (id: string, user: any): Promise<Icategory | null> => {
    const result = await Category
        .findOneAndDelete({
            _id: id,
            organizer: user.organizer
        }).exec();

    if (!result) throw new NotFoundError('Category not found with this id : ' + id);

    return result;
}