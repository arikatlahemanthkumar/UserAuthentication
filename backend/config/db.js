import mongoose from "mongoose"

const configureDB = ()=>{
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("connected to DB")
    })
    .catch((err)=>{
        console.log("error connecting to DB ",err)
    })
}

export default configureDB 