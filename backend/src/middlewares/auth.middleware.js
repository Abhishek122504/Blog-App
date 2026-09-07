import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer", "");

        if (!refreshToken) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ msg: "Unauthorized access" });
        }

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            return res.status(401).json({ msg: "Invalid Access Token" });
        }

        req.user = user;
        next();
    }
    catch (error) {
        console.log("Error from verifyJWT: ", error)
    }
}

export {
    verifyJWT
};