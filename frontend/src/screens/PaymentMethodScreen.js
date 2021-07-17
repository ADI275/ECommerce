import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import _ from 'lodash';

const PaymentMethodScreen = (props) => {

    const {cart}=props;
    const {setcart}=props;
    if(_.isEmpty(cart.shippingAddress))
        props.history.push('/shipping');
    const [paymentMethod,setPaymentMethod]=useState("PayPal");
    const submitHandler=(e)=>{
        e.preventDefault();
        setcart({...cart,paymentMethod: paymentMethod});
        props.history.push('/placeorder');
    }
    return (
        <div className="form-container">
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div style={{margin: '2em'}}>
                <h2>Payment Method</h2>
                <form className="form" onSubmit={submitHandler} style={{marginTop: '2em'}}>
                    <div className="form-group">
                        <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked
                            onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div><button className="btn btn-primary">Continue</button></div>
                </form>
            </div>
        </div>
    );
}
 
export default PaymentMethodScreen;