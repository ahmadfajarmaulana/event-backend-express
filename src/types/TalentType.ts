export type TalentQuery = {
    name?: { $regex?: string, $options?: string };
}

export type TalentInput = {
    name: string;
    role: string;
    image: string;
}