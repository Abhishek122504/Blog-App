import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username : {
        type : String,
        lowercase : true,
        required : true,
        index : true,
        trim : true
    },
    email : {
        type : String,
        lowercase : true,
        unique : true,
        index : true,
        trim : true,
        required : true
    },
    avatar : {
        type : String
    },
    password : {
        type : String,
        lowercase : true,
        trim : true,
        required : true
    },
    refreshToken : {
        type : String,
    }
}, {timestamps : true});

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 8);
})

userSchema.methods.comparePassword = async function(password){
    const match = await bcrypt.compare(password, this.password);
    
    if(match) return true;

    return false;
}

userSchema.methods.generateAccess = function(){
    return jwt.sign({
        _id : this._id,
        username : this.username,
        email : this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefresh = function(){
    return jwt.sign({
        _id : this._id
    },
    process.env.REFRESH_TOKEN_EXPIRY,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    })
}


export const User = mongoose.model("User", userSchema);