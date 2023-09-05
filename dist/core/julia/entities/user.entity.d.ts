export declare enum UserType {
    REGISTERED = "REGISTERED",
    ROGUE = "ROGUE"
}
export declare class User {
    id: string;
    name: string;
    type: UserType;
    email: string;
    pronoun: string;
    classYear: number;
}
