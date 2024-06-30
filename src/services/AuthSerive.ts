import bcrypt from "bcrypt";
import { generateToken } from "../Helpers/Generate";
import { BadRequestError, UnauthorizedError } from "../Helpers/errors";
import { Organizer } from "../schemas/Organizer";
import { IUser, User } from "../schemas/User";
import { OrganizerAndUserInput } from "../types/UserType";

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

export const createOrganizer = async (input: OrganizerAndUserInput): Promise<IUser> => {
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

export const signIn = async (email: string, password: string): Promise<string> => {
    if (!email || !password) throw new BadRequestError("Missing required fields");

    const user = await User.findOne({ email }).select('+password').exec();

    if (!user) throw new UnauthorizedError("Invalid credentials");

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new UnauthorizedError("Invalid credentials");

    const accessToken = generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        organizer: user.organizer,
        role: user.role
    });

    return accessToken;
}

