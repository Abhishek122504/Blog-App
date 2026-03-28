import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


const uploadOnCloudinary = async(imagePath)=>{
    try{
        if(!imagePath) return null;
        const imageUrl = await cloudinary.uploader.upload(imagePath, {
            resource_type: "auto"
        });
        fs.unlinkSync(imagePath)
        return imageUrl;
    }
    catch(error){
        fs.unlinkSync(imagePath)
        console.log("error from cloudinary.js: ", error)
        return null;
    }
}


export {
    uploadOnCloudinary
}