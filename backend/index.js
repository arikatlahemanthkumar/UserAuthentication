import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import configureDB from "./config/db.js"

import userRoutes from "./routes/userRoutes.js"


dotenv.config()
configureDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api',userRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})