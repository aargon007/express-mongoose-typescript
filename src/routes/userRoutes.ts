import express from 'express';
import { createNewUser, getAllUsers, getSingleUser, updateUser, deleteSpecificUser } from "../controllers/userController"
import {updateOrderData, getAllOrders } from "../controllers/orderController";

// express router
const router = express.Router();

// get all users
router.get("/", getAllUsers);

// get single user data
router.get("/:userId", getSingleUser);

// get single user orders data
router.get("/:userId/orders", getAllOrders)

// create new user
router.post("/", createNewUser);

// update user data
router.put("/:userId", updateUser);

// update user order
router.put("/:userId/orders", updateOrderData);

// delete specific user
router.delete("/:userId", deleteSpecificUser);

export const UserRoutes = router;