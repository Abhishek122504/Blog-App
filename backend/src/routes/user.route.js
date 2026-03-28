import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { register, login } from "../controllers/user.controller.js";

const userRoute = Router();

userRoute.post('/register', upload.single("avatar"), register);

export {userRoute}