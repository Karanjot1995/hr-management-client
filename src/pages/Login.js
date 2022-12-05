import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {HOST} from 
const url = `https://hr-server-366909.uc.r.appspot.com`;
// const url = `http://localhost:8080`;

function Login (){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const handleEmailChange = event => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const login = async(e) => {
        e.preventDefault()
        if(!email || !password){
            alert('All fields are mandatory!')
        }else{
            let body = {
                email:email,
                password: password
            }
        
            let opts = {
            method: "POST",
            body:JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
            }

            await fetch(`${url}/api/login`, opts).then(res=>{
            if(res.status==200){
                console.log(res.status)
                return res.json()
            }else{
                alert('Incorrect email or password!')
            }
            }).then(data=>{
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setToken(data.access_token)
            if(data.access_token){
                alert('Logged in successfully!')
                navigate('/')
                window.location.reload();
            }
            })

        }

    }
    useEffect(() => {
        console.log(process.env.HOST)
        setToken(localStorage.getItem('token'))
    },[token]);
    return (
      <div>
        <form className='login-form'>
            <h3>Sign In</h3>
            <div className="mb-3">
            <label>Email address</label>
            <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
            />
            </div>
            <div className="mb-3">
            <label>Password</label>
            <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
            />
            </div>
            <div className="mb-3">
            <div className="custom-control custom-checkbox">
                <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
                </label>
            </div>
            </div>
            <div className="d-grid">
            <button type="submit" onClick={(e)=>login(e)} className="btn btn-primary">
                Submit
            </button>
            </div>
            <div className='d-flex justify-content-between'>
                <p className="forgot-password text-right">
                    <a href="/sign-up">Sign Up</a>
                </p>
                <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
                </p>
            </div>
            
        </form>
      </div>
    )
}

export default Login