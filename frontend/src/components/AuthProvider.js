import AuthContext from "../context/AuthContext"
import { useReducer,useEffect } from "react"
import userReducer from "../reducer/UserReducer"
import axios from "axios"

const initialState = {
    isLoggedIn:false,
    user:null,
    loading:true
}

function AuthProvider({children}){
    const [userState,userDispatch] = useReducer(userReducer,initialState)
    const handleLogin = (data)=>{
        console.log("Login Response:",data)

        if(!data){
            console.log("No token received in login response ")
            return
        }


        localStorage.setItem("token",data.token)
        console.log(localStorage.getItem('token'))

        localStorage.setItem("user", JSON.stringify({
            _id:data._id,
            userName:data.userName,
            email:data.email,

        }))
        userDispatch({type :"LOGIN" ,payload : {isLoggedIn:true, user:data}})
    }
    console.log(userState)

    const handleLogout = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.clear()
        userDispatch({type:"LOGOUT",payload:{isLoggedIn:false,user:null}})
    }

    useEffect(()=>{
        (async ()=>{
            const token = localStorage.getItem("token")
            console.log(token)
            if(!userState.isLoggedIn && token){
                try{
                    const response = await axios.get("http://localhost:3050/api/protected",{
                        headers:{Authorization : token}
                    })
                    console.log(response.data)
                    if(response.data){
                        handleLogin(response.data.user)
                    }
                }catch(error){
                    console.error("Error Fetching user: " ,error.response?.data || error.message)
                    handleLogout()
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