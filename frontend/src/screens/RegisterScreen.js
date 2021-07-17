import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import './SigninScreen.css';

const RegisterScreen = (props) => {

    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const {user}=props;
    const {setuser}=props;
    const [error,seterror]=useState(false);
    const redirect=props.location.search?props.location.search.split('=')[1]:'/'; // if person is logged out and has added items in the cart then when he would proceed to checkout he would first have to sign in and after that he would be redirected to shipping screen 
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!==confirmPassword)
            alert("Password and Confirm Password do not match!");
        else
        {
            const fetchData=async()=>{
                try{
                    const {data}=await axios.post('/api/users/register',{name,email,password});
                    setuser({
                        name: data.name,
                        email: data.email,
                        isAdmin: data.isAdmin,
                        token: data.token,
                        _id: data._id
                    });
                }
                catch(err){
                    seterror(true);
                    console.log(err.message);
                }
            };
            fetchData();
        }
    };
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(user));
        if(user)
            props.history.push(redirect);
    },[user]);
    return (
            <div className="form-container">
                <h2>Create Account</h2>
                <form className="form" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name"
                        onChange={(event)=>setName(event.target.value)} autoComplete="off" />    
                    </div><br />
                    <div className="form-group">                
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                        onChange={(event)=>setEmail(event.target.value)} autoComplete="off" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"
                        onChange={(event)=>setPassword(event.target.value)} />
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"
                        onChange={(event)=>setConfirmPassword(event.target.value)} />
                    </div><br />
                    <div className="form-group"><button type="submit" className="btn btn-primary">Register</button>
                    <div>Already have an Account? <Link to='/signin'>Signin Here</Link></div></div>
                </form>
                {(error)&&<ErrorMessage>Duplicate User goto Signin page-</ErrorMessage>}
            </div>
    );
}
 
export default RegisterScreen;