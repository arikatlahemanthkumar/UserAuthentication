import User from "../model/user.js"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { validationResult } from "express-validator"

const userCtrl = {}

userCtrl.register=async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const body = req.body
    const user = new User(body)
    try{

        const salt = await bcryptjs.genSalt()

        const hashPassword = await bcryptjs.hash(body.password,salt)
        user.password = hashPassword
        await user.save()
        res.status(201).json(user)
    }catch(err){
    
        console.log(err)
       res.status(500).json({error:"Something went wrong"})
    }
}

userCtrl.login = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email ,password} = req.body
    try{
      
      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({error:"Invalid Email/Password"})
      }


      const isValidUser = await bcryptjs.compare(password , user.password)
      if(!isValidUser){
        return res.status(400).json({error:"Invalid Password"})
      }


      const token = jwt.sign({userId:user._id},process.env.JWT_SECRETKEY,{expiresIn:'10d'})
      res.json({
         token : `Bearer ${token}`, 
         user: {_id:user._id , userName:user.userName , email:user.email } 
      })
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Something Went Wrong"})
    }

}

userCtrl.protected = async(req,res)=>{
    try{
        res.json({user:req.currentUser})
    }catch(err){
        res.status(500).json({error:"Something Went Wrong"})
    }
}

export default userCtrl