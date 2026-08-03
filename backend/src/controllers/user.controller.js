import { User } from "../models/user.model.js";
import fs from 'fs';
import { uploadOnCloudinary } from "../utilities/cloudinary.js";

const generateAccessAndRefresh = async (id) => {
    try {
        const user = await User.findById(id);
        const accessToken = user.generateAccess(id);
        const refreshToken = user.generateRefresh(id);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken };
    }
    catch (error) {
        console.log("Some Error Occured from generateAccessAndRefresh");
    }
}

const register = async (req, res) => {
    const { username, email, password } = req.body;
    let imagePath;
    let avatarLocalPath = req.file?.path;
    let uploadedByUser = 1;
    if (!avatarLocalPath) {
        uploadedByUser = 0;
        avatarLocalPath = process.env.ACCOUNT_PNG_URL;
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        return res.status(400).json({ msg: "User with same username/email already exists, try login" })
    }

    if (uploadedByUser) {
        imagePath = await uploadOnCloudinary(avatarLocalPath);
        if (!imagePath) {
            return res.status(500).json({ msg: "some internal error occured, please try again" })
        }
    }
    else imagePath = avatarLocalPath

    const newUser = await User.create({
        username: username.toLowerCase(),
        email: email,
        avatar: imagePath,
        password: password,
        refreshToken: ""
    })

    if (!newUser) {
        return res.status(500).json({ msg: "some internal error occured, please try again" })
    }

    return res.status(200).json({
        msg: "User Registered Successfully",
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({
        email: email
    }).select("_id username password")
    const returnUserData = {
        username : user.username
    }

    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid Password" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefresh(user._id);
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ user: returnUserData, message: "Logged in Successfully!" })

}

const logout = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            msg: "Logged Out Successfully!"
        })
}

const updateProfile = async (req, res) => {
    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                username: username,
                email: email
            }
        },
        {
            new: true
        }
    );

    if (!user) {
        return res.status(400).json({ msg: "Invalid Request" });
    }

    return res.status(200).json({ msg: "Information Updated" })
}

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password")
    }

    user.password = newPassword;
    await user.save()
    return res.status(200)
        .json(new ApiResponse(200, {}, "Password changed"))
}

const updateAvatar = async (req, res) => {
    const newAvatar = req.file?.path;

    if (!newAvatar) {
        return res.status(400).json({ msg: "Avatar is required!" });
    }
    const newAvatarUrl = await uploadOnCloudinary(newAvatar);

    if (!newAvatarUrl) {
        return res.status(500).json({ msg: "Internal Error Occured, Please Try again" });
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                avatar: newAvatarUrl.url
            }
        },
        {
            new: true
        }
    )
    if (!user) {
        return res.status(400).json({ msg: "Invalid Request" });
    }

    return res.status(200).json({ msg: "Avatar Updated" })
}

export {
    register,
    login,
    logout,
    updateProfile,
    updateAvatar,
    updatePassword
}