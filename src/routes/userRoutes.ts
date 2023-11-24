import express from 'express';
import {createNewUser, getAllUsers} from "../controllers/userController"

// express router
const router = express.Router();

// create new user
router.post("/", createNewUser);

// get all users
router.get("/", getAllUsers);


export const UserRoutes = router;