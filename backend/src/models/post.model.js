import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    title : {
        type : String,
        trim : true,
        required : true,
        lowercase : true,
        indexed : true
    },
    desc : {
        type : String,
        trim : true,
        required : true        
    },
    thumbnail : {
        type : String
    },
    postedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    likes : {
        type : Number,
    },
    dislikes : {
        type : Number
    }
}, {timestamps : true});

export const Post = mongoose.model('Post', postSchema);

