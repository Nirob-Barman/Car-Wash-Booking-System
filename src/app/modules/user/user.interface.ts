export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export interface TUser {
    name: TUserName;
    email: string;
    password: string;
    phone: string;
    role: "admin" | "user";
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}
