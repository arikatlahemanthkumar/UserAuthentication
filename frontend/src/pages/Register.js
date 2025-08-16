
import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import '../styles/auth.css';
export default function Register(){
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();
    const [formData, setFormdata] = useState({
        userName:"",
        email : "",
        password : ""
        
    });
    const [clientErrors, setClientErrors] = useState(null);
    const [serverErrors, setServerErrors] = useState(null); 
    const clientValidationsErrors = {};


    const runClientValidations = ()=>{
       
        if(formData.userName.trim().length === 0){
            clientValidationsErrors.userName = 'username  is required'
        }
        if(formData.email.trim().length === 0){
            clientValidationsErrors.email = 'email is required'
        }
         if(formData.password.trim().length === 0){
            clientValidationsErrors.password = 'password is required'
        }
        
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        runClientValidations();
        if(Object.keys(clientValidationsErrors).length === 0) {
            try {
                await axios.post('http://localhost:3050/api/auth/register', formData)
                showSuccess(`Account created successfully! Welcome ${formData.userName}. Please login to continue.`);
                navigate('/login');
            } catch(err) {
                setServerErrors(err.response.data.errors);
                showError("Registration failed. Please check your information and try again.");
                console.log(err.response.data.errors)
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
                    <div className="auth-card-icon">R</div>
                    <h2 className="auth-card-title">Create Account</h2>
                    <p className="auth-card-subtitle">Join us today and get started</p>
                </div>

                <div className="auth-card-body">
                    {serverErrors && (
                        <div className="auth-server-errors">
                            <div className="auth-server-errors-title">Registration Failed</div>
                            <ul className="auth-server-errors-list">
                                {serverErrors.map((ele,i) => {
                                    return (
                                        <li key={i} className="auth-server-errors-item">
                                            {ele.msg}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="auth-form-group">
                            <label className="auth-form-label">Username</label>
                            <div style={{position: 'relative'}}>
                                <div className="auth-form-input-icon">U</div>
                                <input
                                    type="text"
                                    className="auth-form-input"
                                    value={formData.userName}
                                    onChange={(e)=>setFormdata({...formData,userName:e.target.value})}
                                    placeholder="Choose a username"
                                />
                            </div>
                            {clientErrors && clientErrors.userName && (
                                <div className="auth-form-error">
                                    {clientErrors.userName}
                                </div>
                            )}
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-form-label">Email Address</label>
                            <div style={{position: 'relative'}}>
                                <div className="auth-form-input-icon">@</div>
                                <input
                                    type="email"
                                    className="auth-form-input"
                                    value={formData.email}
                                    onChange={(e)=> setFormdata({...formData, email:e.target.value})}
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
                                    onChange={(e)=> setFormdata({...formData, password:e.target.value})}
                                    placeholder="Create a strong password"
                                />
                            </div>
                            {clientErrors && clientErrors.password && (
                                <div className="auth-form-error">
                                    {clientErrors.password}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="auth-form-submit">
                            Create Account
                        </button>
                    </form>
                </div>

                <div className="auth-card-footer">
                    <p className="auth-card-footer-text">
                        Already have an account?
                    </p>
                    <Link to="/login" className="auth-card-footer-link">
                        Sign in instead
                    </Link>
                </div>
            </div>
        </div>
    )
}