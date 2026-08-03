import mongoose from "mongoose";


export const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/BlogApplication`);
        console.log("Connected to Database: ", connectionInstance.connection.host);
    }
    catch(e){
        console.log("Error while connecting to db: ", e);
    }
}