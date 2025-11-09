import React, { useEffect, useState } from 'react'
import axiosInstance from '../lib/axios.js';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:"",
        password:"",
    });

    const [message,setMessage] = useState("signup");

    const handleChange  = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    
    const validateData = (formData)=>{
    if(!formData.name.trim()) return console.error("Full name is required");
    if(!formData.email.trim()) return console.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email))return console.error("Invalid Email format");
    if(!formData.password.trim()) return console.error("Password is required");
    if(formData.password.length < 6) return console.error("Password must be at least 6 characters");

    return true;
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const isOk = validateData(formData);

        const res = await axiosInstance.post("/admin/signup",formData);
        if(res)setMessage("user created");
        else setMessage("error creating user");

    }


    

    
  return (
    <div>
        <h1>Sign Up form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' onChange={handleChange} value={formData.name}  required/>
            <label htmlFor="email">Email:</label>
            <input type="text" name='email'  onChange={handleChange} value={formData.email} required/>
            <label htmlFor="password">Password:</label>
            <input type="password" name='password'  onChange={handleChange} value={formData.password} required/>

            <button type='submit'>Submit</button>
            <h3>{message}</h3>
        </form>
    </div>
  )
}

export default AdminSignup;