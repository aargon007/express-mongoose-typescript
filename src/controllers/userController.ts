import { Request, Response } from 'express';
import User from "../models/userModel";


// create new user


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


export { getAllUsers };