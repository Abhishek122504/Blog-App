import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { register, login, logout } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.route('/register').post(upload.single("avatar"), register);
userRoute.route('/login').post(login);
userRoute.route('/logout').post(logout);

export {userRoute}