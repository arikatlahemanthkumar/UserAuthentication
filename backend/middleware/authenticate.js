import jwt from "jsonwebtoken"
import User from "../model/user.js"

// Authentication middleware to protect API routes - requires valid JWT
const authenticateUser = async (req,res,next)=>{
    // Extract token from Authorization header
    let token = req.headers['authorization']
    if(!token){
        return res.status(401).json({error:"token not provided"}) // 401 Unauthorized for missing token
    }
    // Remove "Bearer " prefix to get actual token
    token = token.split(' ')[1]

    try{
        // Verify JWT token using secret key from environment variables
        const tokenData =  jwt.verify(token,process.env.JWT_SECRETKEY)
        console.log("authenticate user :",tokenData)

        // Fetch user from database and exclude password field
        const user = await User.findById(tokenData.userId).select('-password')
        if(!user){
            return res.status(401).json({error:"User not found"}) // User might be deleted
        }

        // Attach current user data to request object for use in protected routes
        req.currentUser = {
            _id: user._id,
            userName: user.userName,
            email: user.email
        }
        next() // Continue to protected route
    }catch(err){
        console.log(err)
        res.status(401).json({errors:err.message}) // 401 for invalid/expired tokens
    }
}

export default authenticateUser
