import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Signup (){
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password:''
  });

  const signup = async (e) =>{
    e.preventDefault()
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if(values.firstName && values.lastName && values.email && values.password){
      if (reg.test(values.email) === true) {
        let body = {
          first_name:values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password
        }

        let opts = {
          method: "POST",
          body:JSON.stringify(body),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }
        await fetch(`${process.env.REACT_APP_HOST}/api/sign-up`, opts)
        .then(res=>{
          if(res.status==201){
            Swal.fire({
              icon: 'success',
              title: 'Signup Successful!',
              text: 'Login to continue.'
            })
            navigate("/login");
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'User already exists!',
            })
            navigate("/login");
          }
        })
        .then(data=>{
          if(data.status==201){
            Swal.fire({
              icon: 'success',
              title: 'Signup Successful!',
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'User already exists!',
            })
            alert(data.msg)
          }
        })
      }else{
        alert('Please provide a valid email!')
      }
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'All fields are mandatory!',
      })
    }

  }

  const handleFirstNameChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      firstName: event.target.value,
    }));
  };

  const handleLastNameChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      lastName: event.target.value,
    }));
  };
  
  const handleEmailChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      email: event.target.value,
    }));
  };

  const handlePasswordChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      password: event.target.value,
    }));
  };

    return (
      <div>
        <form className='login-form' >
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Last name" 
            value={values.lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" onClick={(e)=>signup(e)} className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
      </div>
    )
}

export default Signup