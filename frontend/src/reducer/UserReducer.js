// State management reducer for authentication - handles login/logout actions
const userReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN":{ // Set user as authenticated with user data
            return {...state,...action.payload}
        }
        case "LOGOUT":{ // Clear authentication and user data
            return {...state,...action.payload}
        }
        case "SET_LOADING":{ // Control loading state display
            return {...state, loading: action.payload}
        }
        default:{
            return {...state}
        }
    }
}
export default userReducer