import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.js";

const generateAccessAndRefresh = async(id)=>{
    try{
        const user = await User.findById(id);
        const accessToken = user.generateAccess(id);
        const refreshToken = user.generateRefresh(id);

        user.refreshToken = refreshToken;
        return {accessToken, refreshToken};
    }
    catch(error){
        console.log("Some Error Occured from generateAccessAndRefresh");
    }
}

const register = async(req, res)=>{
    const {username, email, password} = req.body;
    const avatarLocalPath = req.file.path;

    const existedUser = await User.find({
        $or : [{username}, {email}]
    });

    if(existedUser){
        return res.status(400).json({msg : "User with same username/email already exists, try login"})
    }

    const imagePath = await uploadOnCloudinary(avatarLocalPath);
    if(!imagePath){
        return res.status(500).json({msg : "some internal error occured, please try again"})
    }
    
    const newUser = await User.create({
        username : username.toLowerCase(),
        email : email,
        avatar : imagePath,
        password : password,
        refreshToken : ""
    })
    
    if(!newUser){
        return res.status(500).json({msg : "some internal error occured, please try again"})
    }

    return res.status(200).json({
        msg : "User Registered Successfully",
    })
}

const login = async(req, res)=>{
    const {email, password} = req.body

    const user = await User.find({
        email : email
    });

    if(!user){
        return res.status(400).json({message : "User does not exist"});
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        return res.status(401).json({message : "Invalid Password"});
    }

    const {accessToken, refreshToken} = await generateAccessAndRefresh(user._id);

    const options = {
        httpOnly : true,
        secure : true
    }

    return res.status(200)
              .cookie("accessToken", accessToken, options)
              .cookie("refreshToken", refreshToken, options)
              .json({message : "Logged in Successfully!"})

}

export {
    register,
    login
}