import { Model } from 'mongoose';

// fullname
export type TFullName = {
    firstName: string;
    lastName: string;
}

// orders 
export type TOrder = {
    productName: string;
    price: number;
    quantity: number;
}

//address
export type TAddress = {
    street: string;
    city: string;
    country: string;
}

// user
export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TAddress;
    orders?: TOrder;
}


//for creating static method
export interface userModel extends Model<TUser> {
    isUserExists(userId: number): Promise<TUser | null>;
}