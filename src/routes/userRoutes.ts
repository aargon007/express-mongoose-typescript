import express from 'express';
import {createNewUser, getAllUsers, getSingleUser} from "../controllers/userController"

// express router
const router = express.Router();

// create new user
router.post("/", createNewUser);

// get all users
router.get("/", getAllUsers);

// get single user data
router.get("/:userId", getSingleUser);

export const UserRoutes = router;