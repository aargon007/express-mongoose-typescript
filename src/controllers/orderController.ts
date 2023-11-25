import { Request, Response } from 'express';
import User from "../models/userModel";
import { OrderSchema } from '../validations/userSchemaValidation';
import { TOrder } from "../interfaces/userInterface";
import { sampleErrMsg } from '../utils/simpleErrorMsg';

// add order for a user
const updateOrderData = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        const orderData: TOrder = req.body;
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

// Retrieve all orders for a specific user
const getAllOrders = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        // check if user existed
        const userExists = await User.isUserExists(userId);
        if (!userExists) {
            return res.status(404).json(sampleErrMsg);
        }
        // find order data based on userId
        const result = await User.aggregate([
            { $match: { userId } },
            { $unwind: '$orders' },
            {
                $project: {
                    _id: 0,
                    'orders.productName': 1,
                    'orders.price': 1,
                    "orders.quantity": 1
                }
            }, {
                $group: {
                    _id: '$_id',
                    orders: { $push: '$orders' }
                }
            }, { $project: { _id: 0, orders: 1 } }

        ]);
        // if user is founded
        res.status(200).json({
            success: true,
            message: "Order fetched successfully!",
            data: result[0],
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: err,
        });
    }
};

// Calculate Total Price of Orders for a Specific User
const getTotalOrdersCount = async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.userId, 10);
        // check if user existed
        const userExists = await User.isUserExists(userId);
        if (!userExists) {
            return res.status(404).json(sampleErrMsg);
        }
        // calculate order price based on userId
        const result = await User.aggregate([
            { $match: { userId } },
            {
                $unwind: "$orders"
            },
            // group orders item and calculate sum of price
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: "$orders.price" }
                }
            },
            // only show total price
            {
                $project: {
                    _id: 0,
                    totalPrice: { $round: ["$totalPrice", 2] }
                }
            }
        ])
        // if user is founded
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result[0] ? result[0] : {
                totalPrice: 0
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: err,
        });
    }
};

export { updateOrderData, getAllOrders, getTotalOrdersCount };