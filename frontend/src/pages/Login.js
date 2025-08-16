import { useState } from "react"
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';
export default function Login(){
    const { handleLogin } = useContext(AuthContext); 
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    });
    const [clientErrors, setClientErrors] = useState(null);
    const [serverErrors, setServerErrors] = useState(null); 
    const clientValidationsErrors = {};


    const runClientValidations = ()=>{
        if(formData.password.trim().length === 0){
            clientValidationsErrors.password = 'password is required'
        }

        if(formData.email.trim().length === 0){
            clientValidationsErrors.email = 'email is required'
        }

    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        runClientValidations();
        if(Object.keys(clientValidationsErrors).length === 0) {
            try {
               const response= await axios.post('http://localhost:3050/api/auth/login',formData)
               console.log('Login Response:', response.data)

               const { token, user } = response.data;
               handleLogin({
                   _id: user._id,
                   userName: user.userName,
                   email: user.email,
                   token: token
               })
               navigate('/dashboard')
            } catch(err) {
                if (err.response && err.response.status === 401) {
                    setServerErrors("Login failed - Invalid email or password");
                } else if (err.response && err.response.data && err.response.data.errors) {
                    setServerErrors(err.response.data.errors);
                } else {
                    setServerErrors("Login failed. Please try again.");
                }
            }
            setClientErrors({})
        } else {
            setClientErrors(clientValidationsErrors);
        }
    }

    return(
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-header">
                    <div className="auth-card-icon">L</div>
                    <h2 className="auth-card-title">Welcome Back</h2>
                    <p className="auth-card-subtitle">Sign in to your account to continue</p>
                </div>

                <div className="auth-card-body">
                    {serverErrors && (
                        <div className="auth-server-errors">
                            {typeof serverErrors === 'string' ? (
                                <div className="auth-server-errors-title">{serverErrors}</div>
                            ) : (
                                <>
                                    <div className="auth-server-errors-title">Login Failed</div>
                                    <ul className="auth-server-errors-list">
                                        {serverErrors.map((error, i) => (
                                            <li key={i} className="auth-server-errors-item">
                                                {error.msg || error}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-form-group">
                            <label className="auth-form-label">Email Address</label>
                            <div style={{position: 'relative'}}>
                                <div className="auth-form-input-icon">@</div>
                                <input
                                    type="email"
                                    className="auth-form-input"
                                    value={formData.email}
                                    onChange={(e)=> setFormData({...formData, email:e.target.value})}
                                    placeholder="Enter your email address"
                                />
                            </div>
                            {clientErrors && clientErrors.email && (
                                <div className="auth-form-error">
                                    {clientErrors.email}
                                </div>
                            )}
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-form-label">Password</label>
                            <div style={{position: 'relative'}}>
                                <div className="auth-form-input-icon">*</div>
                                <input
                                    type="password"
                                    className="auth-form-input"
                                    value={formData.password}
                                    onChange={(e)=> setFormData({...formData, password:e.target.value})}
                                    placeholder="Enter your password"
                                />
                            </div>
                            {clientErrors && clientErrors.password && (
                                <div className="auth-form-error">
                                    {clientErrors.password}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="auth-form-submit">
                            Sign In
                        </button>
                    </form>
                </div>

                <div className="auth-card-footer">
                    <p className="auth-card-footer-text">
                        Don't have an account?
                    </p>
                    <Link to="/register" className="auth-card-footer-link">
                        Create a new account
                    </Link>
                </div>
            </div>
        </div>
    )
}