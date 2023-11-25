import { Request, Response } from 'express';
import User from "../models/userModel";
import { OrderSchema } from '../validations/userSchemaValidation';
import { TOrder } from "../interfaces/userInterface";
import { sampleErrMsg } from '../utils/simpleErrorMsg';
import bcrypt from 'bcrypt';
import config from '../app/config';

// add order for a user
const updateOrderData = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        const { orderData }: { orderData: TOrder } = req.body;
        // validate the orderData using zod
        const zodParsedData = OrderSchema.parse(orderData);
        // check if user existed
        const userExists = await User.isUserExists(userId);
        if (!userExists) {
            return res.status(404).json(sampleErrMsg);
        }
        // check if order is an array
        if (!Array.isArray(userExists.orders)) {
            return res.status(400).json({ success: false, message: "'orders' property is not an array" });
        }
        // if user exist then update order data
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            { $addToSet: { orders: zodParsedData } },
            { new: true }
        );
        // send response
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: err,
        });
    }
};

export { updateOrderData};