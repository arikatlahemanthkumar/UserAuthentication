import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import configureDB from "./config/db.js"

import userRoutes from "./routes/userRoutes.js"

// Load environment variables from .env file - critical for JWT secret and DB URL
dotenv.config()
configureDB() // Initialize database connection

const app = express()
app.use(express.json()) // Parse JSON request bodies
app.use(cors()) // Enable cross-origin requests for frontend

app.use('/api',userRoutes) // Mount authentication routes

// Use PORT from environment variables for deployment flexibility
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})