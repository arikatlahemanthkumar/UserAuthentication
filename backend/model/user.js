import {Schema,model} from "mongoose"

// Database Schema as per requirements: username (unique), email (unique, required), password (required)
const userSchema = new Schema({
        userName:{type:String,unique:true}, // unique username for each user
        email:{type:String,unique:true,required:true}, // email is required and must be unique
        password:{type:String,required:true} // password is required - will be hashed before storage
},{timestamps:true}) // automatically adds createdAt and updatedAt fields

const User = model('User',userSchema)

export default User