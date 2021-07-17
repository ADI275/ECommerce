import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import './SigninScreen.css';

const SigninScreen = (props) => {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {user}=props;
    const {setuser}=props;
    const [error,seterror]=useState(false);
    const redirect=props.location.search?props.location.search.split('=')[1]:'/'; // if person is logged out and has added items in the cart then when he would proceed to checkout he would first have to sign in and after that he would be redirected to shipping screen 
    const submitHandler=(e)=>{
        e.preventDefault();
        const fetchData=async()=>{
            try{
                const {data}=await axios.post('/api/users/signin',{email,password});
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
    };
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(user));
        if(user)
            props.history.push(redirect);
    },[user]);
    return (
            <div className="form-container">
                <h2>SignIn</h2>
                <form className="form" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
                        onChange={(event)=>setEmail(event.target.value)} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div><br />
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Password"
                        onChange={(event)=>setPassword(event.target.value)} />
                    </div><br />
                    <div className="form-group"><button type="submit" className="btn btn-primary">Submit</button>
                    <div>New Customer? <Link to='/register'>Create Your Account Here</Link></div></div>
                </form>
                {(error)&&<ErrorMessage>No Such User exists plz register first</ErrorMessage>}
            </div>
    );
}
 
export default SigninScreen;