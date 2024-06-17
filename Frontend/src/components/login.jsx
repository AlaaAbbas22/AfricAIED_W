import React, { useState } from 'react';
import http from './http';
import Logo from '../assets/Logo.jpg'
import { Link } from 'react-router-dom';

function LoginForm({baseURL}){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await http.post(`${baseURL}/login`, { email, password });
            if (response.status === 200) {
                localStorage.setItem("logged", "true")
                window.location.replace("/");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (<div className="container mt-[20vh]">
        <div className="login-box">
            <h1>Welcome to<br/>National Science & Maths Quiz Prep App by Team Kernel! <br></br> (Not affiliated with NSMQ)</h1>
            <form>
                <div className="textbox">
                    <input type="text" placeholder="E-mail or Username" name="username" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="textbox">
                    <input type="password" placeholder="Password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <button className="btn" onClick={handleSubmit}>Login</button>
            </form>
            <p>Are you new here? <Link to="/signup">Sign up</Link></p>
        </div>
        <div className="logo-box">
            <img src={Logo} alt="National Science & Maths Quiz Logo" width="1000" height="200" />
        </div>
    </div>)
}

export default LoginForm