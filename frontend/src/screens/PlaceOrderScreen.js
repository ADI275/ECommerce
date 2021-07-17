import React, { useEffect, useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import './PlaceOrderScreen.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';

const PlaceOrderScreen = (props) => {
    const {cart}=props;
    const {setcart}=props;
    const [order,setorder]=useState({});
    if(!cart.paymentMethod)
        props.history.push('/payment');
    cart.itemsPrice=cart.cartItems.reduce((a,c)=>a+c.price*c.qty,0);
    cart.shippingPrice=(cart.itemsPrice>100)?0:5;
    const toPrice=(num)=>Number(num.toFixed(2));
    cart.taxPrice=toPrice(0.15*cart.itemsPrice);
    cart.totalPrice=cart.taxPrice+cart.shippingPrice+cart.itemsPrice;
    const {user}=props;
    const [error,seterror]=useState(false);
    const [success,setsuccess]=useState(false);

    const placeOrderHandler=()=>{
        
        const fetchdata=async()=>{
            try{
                const {data}=await axios.post('/api/orders',{...cart,orderItems: cart.cartItems},{headers: {authorization: `Bearer ${user.token}`}});
                setorder(data);
                setsuccess(true);
                // setcart([]);
                // localStorage.removeItem("cart");
            }
            catch(err){
                seterror(true);
                console.log(err);
            }
        };
        fetchdata();
    }
    useEffect(()=>{
        if(success)
            props.history.push(`/order/${order.order._id}`);
        // setorder({});
    },[success]);

    return (
        <div className="form-container">
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className="container">
                <div className="left-col">
                    <div className="div1">
                        <h5>Shipping</h5>
                        <div><strong>Name: </strong> {cart.shippingAddress.fullName}</div>
                        <strong>Address: </strong> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country }
                    </div>
                    <div className="div1">
                        <h5>Payment</h5>
                        <strong>Method: </strong> {cart.paymentMethod}
                    </div>
                    <div className="div1">
                        <h5>Order Items</h5>
                        <div>
                            {
                                cart.cartItems.map(el=>(
                                    <div key={el.product} style={{display: 'flex',justifyContent: 'space-between', alignItems: 'center', margin: '0.5em'}}>
                                        <div><img className="img1" src={el.image}></img></div>
                                        <div><strong><Link to={`/product/${el.product}`}>{el.name}</Link></strong></div>
                                        <div>{el.qty} x ${el.price} = <strong>${el.price*el.qty}</strong></div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="right-col">
                    <h5>Order Summary</h5>
                    <div style={{display: 'flex', justifyContent: 'space-between',margin: '0.5em'}}>
                        <div>Subtotal</div>
                        <div><strong>${cart.itemsPrice.toFixed(2)}</strong></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between',margin: '0.5em'}}>
                        <div>Shipping Cost</div>
                        <div><strong>${cart.shippingPrice.toFixed(2)}</strong></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between',margin: '0.5em'}}>
                        <div>Tax</div>
                        <div><strong>${cart.taxPrice.toFixed(2)}</strong></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between',margin: '0.5em'}}>
                        <div><strong>Order Total</strong></div>
                        <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center',margin: '0.5em'}}>
                        <button className="button" style={{minWidth: '60%'}} disabled={cart.cartItems.length===0}
                            onClick={placeOrderHandler}>Place Order</button>
                    </div>
                </div>
            </div>
            {
                error&&<ErrorMessage>Place Order Failed! Please try again</ErrorMessage>
            }
        </div>
    );
}
 
export default PlaceOrderScreen;