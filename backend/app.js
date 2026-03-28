import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express";
import dotenv from "dotenv"
import { userRoute } from "./src/routes/user.route.js";
import {v2 as cloudinary} from "cloudinary";

dotenv.config({path : "./.env"})

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY
  });

const app = express();
const port = 5000;

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("working")
})

app.use("/api/v1/users", userRoute)


app.listen(port, ()=>{
    console.log("Running on port: ", port);
})
