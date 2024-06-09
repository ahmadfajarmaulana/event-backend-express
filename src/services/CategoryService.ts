import BadRequest from "../Helpers/errors/bad-request";
import NotFound from "../Helpers/errors/not-found";
import { Category, Icategory } from "../schemas/Category";
import { CategoryInput } from "../types/CategoryType";

export const create = async (value: CategoryInput): Promise<Icategory> => {
    const category = new Category(value);

    const check = await Category.findOne({name: value.name}).exec();

    if (check) throw new BadRequest('Category already exists');

    await category.save();

    return category;
} 


export const findAll = async (): Promise<Icategory[]> => {
    const categories = await Category.find().select({id: 1, name: 1}).exec();

    return categories;
}

export const findById = async (id: string): Promise<Icategory | null> => {
    const result = await Category.findById(id).select({id: 1, name: 1}).exec();

    if (!result) throw new NotFound('Category not found with this id : ' + id);

    return result;
}

export const update = async (id: string, {name}: Icategory): Promise<Icategory | null> => {
    const result = await Category.findByIdAndUpdate(id, {name}, { new: true, runValidators: true }).exec();

    if (!result) throw new NotFound('Category not found with this id : ' + id);

    return result;
}

export const remove = async (id: string): Promise<Icategory | null> => {
    const result =  await Category.findByIdAndDelete(id).exec();

    if (!result) throw new NotFound('Category not found with this id : ' + id);

    return result;
}