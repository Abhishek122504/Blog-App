import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { uploadPost, editPost, deletePost, getAllPosts } from "../controllers/post.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const postRoute = Router();

postRoute.get("/getAllPosts", getAllPosts)
postRoute.post("/uploadPost", verifyJWT, upload.single("thumbnail"), uploadPost)
postRoute.post("/editPost", verifyJWT, upload.single("thumbnail"), editPost)
postRoute.post("/deletePost:postId", verifyJWT, deletePost)

export {postRoute}