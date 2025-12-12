import {express, Router} from "express";
import { signUp, login, updateProfile,checkAuth } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.put('/update-profile', protectRoute, updateProfile);
userRouter.get('/check-auth', protectRoute, checkAuth);

export default userRouter;

