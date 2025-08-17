import mongoose from "mongoose"

// Database configuration - connects to MongoDB using environment variable
const configureDB = ()=>{
    mongoose.connect(process.env.DB_URL) // DB_URL from .env file for security
    .then(()=>{
        console.log("connected to DB")
    })
    .catch((err)=>{
        console.log("error connecting to DB ",err) // Handle database connection errors
    })
}

export default configureDB