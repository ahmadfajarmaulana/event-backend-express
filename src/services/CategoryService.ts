import { Category, Icategory } from "../schemas/Category";

export const create = async ({name}: Icategory): Promise<Icategory> => {
    const category = new Category({name});
    await category.save();

    return category;
} 


export const findAll = async (): Promise<Icategory[]> => {
    const categories = await Category.find().select({id: 1, name: 1}).exec();

    return categories;
}

export const findById = async (id: string): Promise<Icategory | null> => {
    const category = await Category.findById(id).select({id: 1, name: 1}).exec();

    return category;
}

export const update = async (id: string, {name}: Icategory): Promise<Icategory | null> => {
    const category = await Category.findById(id).exec();

    if(!category){
        return null;
    }

    category.name = name;
    await category.save();

    return category;
}

export const remove = async (id: string): Promise<Icategory | null> => {
    return await Category.findByIdAndDelete(id).exec();
}