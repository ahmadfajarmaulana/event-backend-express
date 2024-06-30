export type UserInput = {
    name: string;
    email: string;
    password: string;
}

export type OrganizerAndUserInput = {
    organizerName: string;
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
    role?: 'admin' | 'organizer' | 'owner';
}