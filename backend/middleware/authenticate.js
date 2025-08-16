import jwt from "jsonwebtoken"
import User from "../model/user.js"

const authenticateUser = async (req,res,next)=>{

    let token = req.headers['authorization']
    if(!token){
        return res.status(401).json({error:"token not provided"})
    }
    token = token.split(' ')[1]

    try{

        const tokenData =  jwt.verify(token,process.env.JWT_SECRETKEY)
        console.log("authenticate user :",tokenData)
        const user = await User.findById(tokenData.userId).select('-password')
        if(!user){
            return res.status(401).json({error:"User not found"})
        }
        req.currentUser = {
            _id: user._id,
            userName: user.userName,
            email: user.email
        }
        next() 
    }catch(err){
        
        console.log(err)
        res.status(401).json({errors:err.message})
    }
}

export default authenticateUser
