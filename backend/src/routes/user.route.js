import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { getCurrentUser, register, login, logout } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.route('/fetchUser').get(verifyJWT,getCurrentUser);
userRoute.route('/register').post(upload.single("avatar"), register);
userRoute.route('/login').post(login);
userRoute.route('/logout').post(verifyJWT, logout);

export {userRoute}