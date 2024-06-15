import React, { useState } from 'react';
import http from './http';
import Logo from '../assets/Logo.jpg'
import { Link } from 'react-router-dom';

function SignUp({baseURL}){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [date, setDate] = useState('');
    const [school, setSchool] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await http.post(`${baseURL}/register`, { email, password, username, date, school });
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

    return (<div className="User info bg-white p-10">
        <h2 className="title2"> Let's Create an Account</h2>
        <div className="logo-box">
            <img src={Logo} alt="National Science & Maths Quiz Logo" width="1000" height="200"/>
        </div>

        <form>
            <div className="textbox">
                <input type="email" placeholder="Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            </div>
            <div className="textbox">
                <input type="username" placeholder="Username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
            </div>
            <div class="textbox">
                <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
            </div>
            <div class="textbox">
                <input type="date" placeholder="Date of Birth" name="date" value={date} onChange={(e)=>setDate(e.target.value)} required/>
            </div>
            <div class="textbox">
                <input type="text" placeholder="School Name" name="School Name" value={school} onChange={(e)=>setSchool(e.target.value)} required/>
            </div>
            <div className="form-group">
                    <label for="Role">Pick your role:</label>
                    <select id="toggleList" name="Role">
                        <option value="Teacher">Teacher</option>
                        <option value="Student">Student</option>
                    </select>
                </div>
                <div className="sign-up-button">
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>

                </div>
                <p>Returner? <Link to="/login">Login instead!</Link></p>
            
        </form>
    </div>)
}

export default SignUp