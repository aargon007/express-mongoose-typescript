import express from 'express';
import {getAllUsers} from "../controllers/userController"

// express router
const router = express.Router();

// get all users
router.get("/", getAllUsers);


export const UserRoutes = router;