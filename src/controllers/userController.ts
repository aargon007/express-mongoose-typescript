import { Request, Response } from 'express';
import User from "../models/userModel";
import { userValidationSchema } from '../validations/userSchemaValidation';
import { TUser } from "../interfaces/userInterface";
import { sampleErrMsg } from '../utils/simpleErrorMsg';
import bcrypt from 'bcrypt';
import config from '../app/config';

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
            email: result.email,
            isActive: result.isActive,
            hobbies: result.hobbies,
            address: result.address
        }
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

//get specific user
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        // check if user existed
        const userExists = await User.isUserExists(userId);
        if (!userExists) {
            return res.status(404).json(sampleErrMsg);
        }
        
        // find user based on userId
        const result = await User.findOne({ userId }, "-_id -orders -password");
        // if user is founded
        res.status(200).json({
            success: true,
            message: "User fetched successfully!",
            data: result,
        });

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
};

// update specific user data
const updateUser = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        const { userData }: { userData: TUser } = req.body;
        // validate the userData using zod
        const zodParsedData = userValidationSchema.parse(userData);
        // check if user existed
        const userExists = await User.isUserExists(userId);
        if (!userExists) {
            return res.status(404).json(sampleErrMsg);
        }
        // hashed updated password
        const hashedPassword = await bcrypt.hash(zodParsedData.password, Number(config.bcrypt_salt_rounds));
        zodParsedData.password = hashedPassword;
        
        // if user exist then update it
        const result = await User.findOneAndUpdate({userId}, zodParsedData, { new: true }).select("-orders -_id -password");
        // send response
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
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


export { getAllUsers, createNewUser, getSingleUser,updateUser };