import { IUser, User } from "../schemas/User";

export const createUser = async ({name, email, password}: IUser): Promise<IUser> => {
    const user = new User({name, email, password});
    await user.save();

    return user;
} 

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email }, "-password -__v").exec();

    if(!user) {
        return null;
    }

    return user;
}

export const findAllUsers = async (): Promise<IUser[]> => {
    const users = await User.find({}, "-password -__v").exec();

    return users;
}

export const findUserById = async (id: string): Promise<IUser | null> => {
    const user = await User.findById(id, "-password -__v").exec();

    return user;
}

export const updateUser = async (id: string, value: IUser) => {
    const user = await User.findByIdAndUpdate(id, value, { new: true });

    return user;
}

