import React, { useEffect, useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import './ShippingAddressScreen.css';

const ShippingAddressScreen = (props) => {
    const {user}=props;
    const {cart}=props;
    const {setcart}=props;
    if(!user)
        props.history.push('/signin');
    
    const [fullName,setFullName]=useState(cart.shippingAddress.fullName);
    const [address,setAddress]=useState(cart.shippingAddress.address);
    const [city,setCity]=useState(cart.shippingAddress.city);
    const [country,setCountry]=useState(cart.shippingAddress.country);
    const [postalCode,setPostalCode]=useState(cart.shippingAddress.postalCode);

    const submitHandler=(e)=>{
        e.preventDefault();
        const details={
            fullName: fullName,
            address: address,
            city: city,
            country: country,
            postalCode: postalCode
        };
        setcart({...cart,shippingAddress: details});
        localStorage.setItem("cart",JSON.stringify({...cart,shippingAddress: details}));
        props.history.push('/payment');
    }
    return (
        <div className="form-container">
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h2>Shipping Address</h2>
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" className="form-control" id="fullName" placeholder="Enter Full Name" value={fullName}
                     onChange={(e)=>setFullName(e.target.value)} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter Address" value={address}
                     onChange={(e)=>setAddress(e.target.value)} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" placeholder="Enter City" value={city}
                     onChange={(e)=>setCity(e.target.value)} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" className="form-control" id="postalCode" placeholder="Enter Postal Code" value={postalCode}
                     onChange={(e)=>setPostalCode(e.target.value)} required></input>
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" placeholder="Enter Country" value={country}
                     onChange={(e)=>setCountry(e.target.value)} required></input>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    );
}
 
export default ShippingAddressScreen;