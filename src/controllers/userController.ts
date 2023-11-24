import { Request, Response } from 'express';
import User from "../models/userModel";
import { userValidationSchema } from '../validations/userSchemaValidation';
import { TUser } from "../interfaces/userInterface";

// create new user
const createNewUser = async (req: Request, res: Response) => {
    try {
        const { userData }: { userData: TUser } = req.body;
        
        const zodParsedData = userValidationSchema.parse(userData);

        if (await User.isUserExists(userData.userId)) {
            throw new Error('User already exists!');
        }

        const result = await User.create(zodParsedData).select("-_id orders");

        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
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