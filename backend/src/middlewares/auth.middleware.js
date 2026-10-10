import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        const refreshToken = req.cookies.refreshToken;
        let user = null;
        let newAccessToken = undefined;

        if (accessToken) {
            try {
                const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
                user = await User.findById(decodedAccessToken._id).select("-password -refreshToken");

            } catch (error) {
                console.log(error);
            }
        }

        if(!user && refreshToken){
            try{
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

                const id = decodedRefreshToken._id;
                user = await User.findById(id).select("-password -refreshToken");
                if (!user) {
                    return res.status(401).json({
                        msg: "User not found"
                    });
                }
                newAccessToken = user.generateAccess(id);

                res.cookie(
                    "accessToken", newAccessToken,
                    {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "production",
                        maxAge: 10 * 1000
                    }
                )    
            }
            catch(error){
                return res.status(401).json({
                    msg: "Invalid or expired refresh token"
                });
            }
        }

        if (!user) {
            return res.status(401).json({ msg: "Invalid Access Token" });
        }
        user.accessToken = newAccessToken;

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