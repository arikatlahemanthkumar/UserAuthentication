import User from "../model/user.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { validationResult } from "express-validator"

const userCtrl = {}

// POST /api/auth/register - User registration with password hashing (bcrypt)
userCtrl.register=async(req,res)=>{
    // Check validation errors from express-validator middleware
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}) // 400 Bad Request for validation errors
    }

    const body = req.body
    const user = new User(body)
    try{
        // Generate salt for password hashing - each user gets unique salt
        const salt = await bcryptjs.genSalt()
        // Hash password with bcrypt - never store plain text passwords
        const hashPassword = await bcryptjs.hash(body.password,salt)
        user.password = hashPassword
        await user.save()
        res.status(201).json(user)
    }catch(err){
        console.log(err)
       res.status(500).json({error:"Something went wrong"}) // 500 for server errors
    }
}

// POST /api/auth/login - User login with JWT token generation
userCtrl.login = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}) // 400 Bad Request for invalid credentials
    }

    const {email ,password} = req.body
    try{
      // Find user by email in database
      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({error:"Invalid Email/Password"}) // Don't reveal if email exists
      }

      // Compare plain text password with hashed password using bcrypt
      const isValidUser = await bcryptjs.compare(password , user.password)
      if(!isValidUser){
        return res.status(400).json({error:"Invalid Password"}) // 401 Unauthorized for wrong password
      }

      // Generate JWT token with user ID - stateless authentication
      const token = jwt.sign({userId:user._id},process.env.JWT_SECRETKEY,{expiresIn:'10d'})
      res.json({
         token : `Bearer ${token}`, // Bearer format for Authorization header
         user: {_id:user._id , userName:user.userName , email:user.email } // Return user data (no password)
      })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Something Went Wrong"}) // 500 Internal Server Error
    }
}

// GET /api/protected - Protected route that requires valid JWT
userCtrl.protected = async(req,res)=>{
    try{
        // req.currentUser is set by authentication middleware
        res.json({user:req.currentUser})
    }catch(err){
        res.status(500).json({error:"Something Went Wrong"})
    }
}

export default userCtrl