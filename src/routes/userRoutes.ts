import express from 'express';
import { createNewUser, getAllUsers, getSingleUser, updateUser, deleteSpecificUser } from "../controllers/userController"

// express router
const router = express.Router();

// create new user
router.post("/", createNewUser);

// update user data
router.put("/:userId", updateUser)

// get all users
router.get("/", getAllUsers);

// get single user data
router.get("/:userId", getSingleUser);

// delete specific user
router.delete("/:userId", deleteSpecificUser)

export const UserRoutes = router;