import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import { useStateProvider } from "../../utils/StateProvider";

function LoginPage() {
    const { dispatch } = useStateProvider();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [emailUp, setEmailUp] = useState("");
    const [password, setPassword] = useState("");
    const [passwordUp, setPasswordUp] = useState("");
    const [profileImage, setProfileImage] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/login", { email, password })
            .then(res => {
                console.log(res);
                const userData = res.data;
                if (userData) {
                    dispatch({ type: "SET_ID", payload: userData.id });
                    localStorage.setItem("userId", userData.id);
                    window.location.reload();
                }
            })
            .catch(err => console.log(err));
    };
    const handleSignUp = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", emailUp);
        formData.append("password", passwordUp);
        formData.append("profileImage", profileImage);

        axios.post("http://localhost:8081/signup", formData)
            .then(res => {
                console.log(res.data);
                if (res.data.message) {
                    console.log('User registered successfully');
                } else {
                    console.log('Error:', res.data.error);
                }
            })
            .catch(err => console.log(err));
        
        window.location.reload();
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className='SignPage'>
            <div className={`containerSign ${isSignUp ? 'right-panel-active' : ''}`}>
                {isSignUp ? (
                    <div className="form-containerSign sign-up-containerSign">
                        <form onSubmit={handleSignUp}> 
                            <h1 className="fs-2">Create Account</h1>
                            <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" />
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" placeholder="Name" />
                            <input type="email" value={emailUp} onChange={(e) => setEmailUp(e.target.value)} name="emailUp" placeholder="Email" />
                            <input type="password" value={passwordUp} onChange={(e) => setPasswordUp(e.target.value)} name="passwordUp" placeholder="Password" />
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                ) : (
                    <div className="form-containerSign sign-in-containerSign">
                        <form onSubmit={handleLogin}> 
                            <h1>Sign In</h1>
                            <div className="social-containerSign">
                                <a href="#" className="social"><i className="fa fa-facebook"></i></a>
                                <a href="#" className="social"><i className="fa fa-google"></i></a>
                                <a href="#" className="social"><i className="fa fa-linkedin"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" />
                            <a href="#">Forgot Your Password</a>
                            <button type="submit">Sign In</button>
                        </form>
                    </div>
                )}

                <div className="overlay-containerSign">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us, please login with your personal info</p>
                            <button className="ghost" onClick={toggleForm}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your details and start your journey with us</p>
                            <button className="ghost" onClick={toggleForm}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
