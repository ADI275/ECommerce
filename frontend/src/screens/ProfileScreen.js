import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import ErrorMessage from '../components/ErrorMessage';

const ProfileScreen = (props) => {
    const {user}=props;
    const {setuser}=props;
    if(!user)
        props.history.push('/signin');

    const [error,seterror]=useState(false);
    const [loading,setloading]=useState(true);
    const [userDetails,setuserDetails]=useState(null);
    const [name,setname]=useState('');
    const [password,setpassword]=useState('');
    const [email,setemail]=useState('');
    const [confirmpassword,setconfirmpassword]=useState('');

    const [usersuccess,setusersuccess]=useState(false);
    const [usererror,setusererror]=useState(false);
    const [userloading,setuserloading]=useState(false);

    useEffect(()=>{
        if(!userDetails)
        {
            const fetchdata=async()=>{
                try{
                    const {data}=await axios.get(`/api/users/${user._id}`,{headers: {authorization: `Bearer ${user.token}`}});
                    setuserDetails(data);
                    setloading(false);
                }
                catch(err){
                    seterror(true);
                    setloading(false);
                    console.log(err);
                }
            };
            fetchdata();
        }
        else
        {
            setname(userDetails.name);
            setemail(userDetails.email);
        }
    },[user,userDetails]);

    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!==confirmpassword)
            alert('Password and Confirm Password are different');
        else
        {
            const fetchdata=async()=>{
                try{
                    setuserloading(true);
                    const {data}=await axios.put('/api/users/profile',{userId: user._id,name,email,password},{headers: {authorization: `Bearer ${user.token}`}});
                    setuserDetails(data);
                    setuser(data);
                    localStorage.setItem("user",JSON.stringify(data));
                    setusersuccess(true);
                    setuserloading(false);
                }
                catch(err){
                    setusererror(true);
                    setuserloading(false);
                    console.log(err);
                }
            };
            fetchdata();
        }
    };

    return (
        <div className="form-container">
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>User Profile</h2>
                </div>
                {
                    loading?<LoadingBox />:
                    error?<ErrorMessage>Could not get the User Details</ErrorMessage>:
                    <div>
                        {userloading&&<LoadingBox />}
                        {usererror&&<ErrorMessage>User Profile was not able to get updated</ErrorMessage>}
                        {usersuccess&&
                            <div style={{display: "flex",color: "green",width: "100%", background: "#00FA9A",height: "3.5rem",
                                justifyContent: "center",marginTop: "1em",alignItems: "center"}}>
                                User Profile was updated Successfully!!
                            </div>
                        }
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Enter name" value={name}
                                onChange={(e)=>setname(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" value={email}
                                onChange={(e)=>setemail(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password"
                                onChange={(e)=>setpassword(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" placeholder="Enter Confirm Password"
                                onChange={(e)=>setconfirmpassword(e.target.value)}></input>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Update</button>
                        </div>
                    </div>   
                }
            </form>
        </div>
    );
}
 
export default ProfileScreen;