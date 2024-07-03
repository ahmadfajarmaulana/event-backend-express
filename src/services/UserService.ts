import { BadRequestError } from "../Helpers/errors";
import { Organizer } from "../schemas/Organizer";
import { IUser, User } from "../schemas/User";
import { OrganizerInput } from "../types/UserType";

export const createUser = async ({ name, email, password }: IUser): Promise<IUser> => {
    const user = new User({ name, email, password });
    await user.save();

    return user;
}

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    const user = await User.findOne({ email }, "-password -__v").exec();

    if (!user) {
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

export const createUserOrganizer = async (input: OrganizerInput): Promise<IUser> => {
    if (input.password !== input.confirmPassword) {
        throw new BadRequestError("Password and confirm password is not match");
    }

    const organizer = new Organizer({ name: input.organizerName });
    await organizer.save();

    const user = new User({
        name: input.name,
        email: input.email,
        password: input.password,
        organizer: organizer.id,
        role: input.role
    });

    await user.save();

    return user;
}

export const createUserAdmin = async (input: OrganizerInput, auth: any): Promise<IUser> => {
    if (input.password !== input.confirmPassword) {
        throw new BadRequestError("Password and confirm password is not match");
    }

    const user = new User({
        name: input.name,
        email: input.email,
        password: input.password,
        organizer: auth.organizer,
        role: input.role
    });

    await user.save();

    return user;
}
