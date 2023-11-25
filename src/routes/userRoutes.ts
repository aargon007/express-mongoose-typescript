import express from 'express';
import {createNewUser, getAllUsers, getSingleUser,updateUser} from "../controllers/userController"

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

export const UserRoutes = router;