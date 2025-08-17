import AuthContext from "../context/AuthContext"
import { useReducer,useEffect } from "react"
import userReducer from "../reducer/UserReducer"
import axios from "axios"

// State management solution using React Context - stores authentication status and JWT
const initialState = {
    isLoggedIn:false,
    user:null,
    loading:true
}

function AuthProvider({children}){
    const [userState,userDispatch] = useReducer(userReducer,initialState)

    // Handle user login - stores JWT securely in localStorage
    const handleLogin = (data)=>{
        console.log("Login Response:",data)

        if(!data){
            console.log("No token received in login response ")
            return
        }

        // Store JWT securely in localStorage for persistence across sessions
        localStorage.setItem("token",data.token)
        console.log(localStorage.getItem('token'))

        // Store user data separately (no sensitive information)
        localStorage.setItem("user", JSON.stringify({
            _id:data._id,
            userName:data.userName,
            email:data.email,
        }))
        userDispatch({type :"LOGIN" ,payload : {isLoggedIn:true, user:data}})
    }
    console.log(userState)

    // Handle user logout - clears all stored authentication data
    const handleLogout = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.clear() // Complete cleanup of localStorage
        userDispatch({type:"LOGOUT",payload:{isLoggedIn:false,user:null}})
    }

    // Automatic token validation on app load - maintains user session
    useEffect(()=>{
        (async ()=>{
            const token = localStorage.getItem("token")
            console.log(token)
            if(!userState.isLoggedIn && token){
                try{
                    // Verify token with protected route - ensures token is still valid
                    const response = await axios.get("http://localhost:3050/api/protected",{
                        headers:{Authorization : token}
                    })
                    console.log(response.data)
                    if(response.data){
                        handleLogin(response.data.user) // Restore user session
                    }
                }catch(error){
                    console.error("Error Fetching user: " ,error.response?.data || error.message)
                    handleLogout() // Clear invalid token
                }
            }
            userDispatch({type:"SET_LOADING",payload:false})
        })()

    },[userState?.isLoggedIn])

    if(userState.loading){
        return <div>Loading...</div>
    }

    return(
        <AuthContext.Provider value={{userState , handleLogin , handleLogout}}>
           {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider