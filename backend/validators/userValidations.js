import User from "../model/user.js"

export const userRegisterSchema = {
    userName:{
        exists:{
            errorMessage:"UserName is Required"
        },
        notEmpty:{
            errorMessage:"UserName cannot be Empty"
        },
        isLength:{
            options:{min:3,max:50},
            errorMessage: "Name Should be between 3 to 50 characters"
        },
        trim:true
    },
    email:{
        exists:{
            errorMessage:"Email is Required"
        },
        notEmpty:{
            errorMessage:"Email Cannot be empty"
        },
        isEmail:{
            errorMessage:"Email must be in valid format "
        },
        custom:{
            options:async(value)=>{
                const user = await User.findOne({email:value})
                if(user){
                    throw new Error ("Email is already in use")
                }
                return true
            }
        },
        trim:true,
        normalizeEmail:true
    },
    password:{
        exists:{
            errorMessage:"Password is required"
        },
        notEmpty:{
            errorMessage:"Password cannot be Empty "
        },
        isStrongPassword:{
            options:{
                minLength:8,
                minLowerCase:1,
                minUpperCase:1,
                minNumbers:1,
                minSymbols:1,
            },
            errorMessage:"password must be atleast 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
        },
        trim:true
    },
}

export const userLoginSchema ={
    email:{
        exists:{
            errorMessage:"Email field is required"
        },
        notEmpty:{
            errorMessage:"Email cannot be Empty"
        },
        isEmail:{
            errorMessage:"Email must be in a valid format"
        },
        trim:true,
        normalizeEmail:true
    },
    password:{
        exists:{
            errorMessage:"Password field is required"
        },
        notEmpty:{
            errorMessage:"Password cannot be Empty"
        },
        isLength:{
            options:{min:8},
            errorMessage:"Password must be at least 8 characters long"
        },
        trim:true
    }
}
