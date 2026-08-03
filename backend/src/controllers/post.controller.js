import { Post } from "../models/post.model.js"
import { uploadOnCloudinary } from "../utilities/cloudinary.js";


const getAllPosts = async(req, res)=>{
    try{
        const page = Number(req.query.page) || 1;
        const postPerPage = 20;
        const skip = (page-1) * postPerPage;

        const posts = await Post.find()
                                .select("_id title desc thumbnail postedBy likes createdAt")
                                .limit(postPerPage)
                                .skip(skip)
                                .populate("postedBy", "username");

        return res.status(200).json({
            success: true,
            posts: posts
        })
        
    }catch(error){
        return res.status(500).json({msg : "Error while fetching posts: post.controllers"})
    }
}

const uploadPost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        const thumbnailPath = req.file?.path;

        const thumbString = await uploadOnCloudinary(thumbnailPath);

        if(!thumbString){
            return res.status(501).json({msg : "Some error occured, please try again!"});
        }

        const post = await Post.create({
            title : title,
            desc : desc,
            thumbnail : thumbString.url,
            postedBy : req.user._id
        });

        if(!post){
            return res.status(501).json({msg : "Some error occured!"});
        }

        return res.status(200).json({msg : "Posted successfully!"});

    }
    catch(error){
        console.log("Error from uploadPost: ", error);
    }
    
}
 
const editPost = async(req, res)=>{
    const {title, desc, pid} = req.body;
    const updatedThumbnail = req.file?.path;
    let updatedThumbnailURL;
    const post = await Post.findById(pid);
    if(!post) return res.status(404).json({msg : "Post Not Found"});
    if(!post.postedBy.equals(req.user._id)){
        return res.status(401).json({msg : "Unauthorized Access Denied!"})
    }

    if(updatedThumbnail){
        updatedThumbnailURL = await uploadOnCloudinary(updatedThumbnail);
        if(!updatedThumbnailURL){
            return res.status(500).json({msg : "Some error occured, please try again!"});
        }
    }
    
    const updatedPost = await Post.findByIdAndUpdate(
        {_id : pid},
        {
            $set : {
                title : title,
                desc : desc,
                thumbnail : updatedThumbnailURL ? updatedThumbnailURL : post.thumbnail
            }
        },
        {
            new : true
        }
    )

    if(!updatedPost){
        return res.status(500).json({msg : "Some error occured"});
    }

    return res.status(200).json({msg : "Post Successfully Edited!", updatedPost : updatedPost});
}

const deletePost = async(req, res) => {
    const {postId} = req.params;

    if(!post){
        return res.status(404).json({msg : "Post does not exist"});
    }

    const post = await Post.findById(postId);
    if(!post.postedBy.equals(req.user._id)){
        return res.status(403).json({msg : "Unauthorized Action!"})
    }

    const result = await Post.deleteOne({_id : postId});

    if(result.deletedCount === 0){
        return res.status(500).json({msg : "There was an error deleting the post"});
    }

    return res.status(200).json({msg : "Post Successfully Deleted!"});
}

export {
    uploadPost,
    editPost,
    deletePost
}