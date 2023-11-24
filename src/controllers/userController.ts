import { Request, Response } from 'express';
import User from "../models/userModel";
import { userValidationSchema } from '../validations/userSchemaValidation';
import { TUser } from "../interfaces/userInterface";

// create new user
const createNewUser = async (req: Request, res: Response) => {
    try {
        const { userData }: { userData: TUser } = req.body;
        // validate the userData using zod
        const zodParsedData = userValidationSchema.parse(userData);
        // check if user already exist
        if (await User.isUserExists(userData.userId)) {
            throw new Error('User already exists!');
        }
        // if user not exist then create one
        const result = await User.create(zodParsedData);
        // if user created then find the user and send neccesary data
        const resData = {
            userId: result.userId,
            username: result.username,
            fullName: result.fullName,
            age: result.age,
            email:result.email,
            isActive:result.isActive,
            hobbies: result.hobbies,
            address: result.address
        }
    //    const resData = await User.findById(result._id).select("userId username");
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: resData,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
    try {
        // get data from db
        const users = await User.find({}).select('-_id username fullName age email address');
        // send response data
        res.json({
            success: true,
            message: 'Users fetched successfully!',
            data: users,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        })
    }
}


export { getAllUsers , createNewUser};