import mongoose from "mongoose";
import constants from "./constants.js";

async function connectDB() {
    try {
        const dbUri = process.env.DB_URI + "/" + constants.dbName;
        const conn = await mongoose.connect(dbUri);  
        console.log(`DATABASE CONNECTED SUCCESSFULLY on HOST: ${conn.connection.host}`); 
         
    } catch (error) {
        console.error(`DATABASE CONNECTION FAILED !!! ${error}`);
        process.exit(1);
    }
}
export default connectDB;