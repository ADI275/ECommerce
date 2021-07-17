import React, { useEffect, useState } from 'react';
import './PlaceOrderScreen.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import LoadingBox from '../components/LoadingBox';
import { PayPalButton } from 'react-paypal-button-v2';

const OrderScreen = (props) => {
    const {user}=props;
    const [error,seterror]=useState(false);
    const [loading,setloading]=useState(true);
    const [orderDetails,setOrderDetails]=useState({order: {}});
    const orderId=props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    
    const {order}=orderDetails;
    
    const [paymenterror,setpaymenterror]=useState(false);
    const [paymentsuccess,setpaymentsuccess]=useState(false);
    const [paymentloading,setpaymentloading]=useState(false);
    const [orderPay,setOrderPay]=useState({});

    useEffect(() => {
        const fetchdata=async()=>{
            try{
                const {data}=await axios.get(`/api/orders/${orderId}`, {headers: {authorization: `Bearer ${user.token}`}});
                setOrderDetails({order: data});
                setloading(false);
            }
            catch(err){
                seterror(true);
                setloading(false);
                console.log(err);
            }
        };

        const addPayPalScript = async () => {
          const { data } = await axios.get('/api/config/paypal');
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
          script.async = true;
          script.onload = () => {
            setSdkReady(true);
          };
          document.body.appendChild(script);
        };
        if(!order._id||paymentsuccess)
        {
            setOrderPay({});
            fetchdata();
        }
        else
        {
            if(!order.isPaid)
            {
                if(!window.paypal)
                    addPayPalScript();
                else
                    setSdkReady(true);
            }
        }
    },[orderId,order,paymentsuccess,orderPay]);

    const successPaymentHandler=(paymentResult)=>{
        const fetchdata=async()=>{
            try{
                setpaymentloading(true);
                const {data}=await axios.put(`/api/orders/${order._id}/pay`,paymentResult,{headers: {authorization: `Bearer ${user.token}`}});
                setOrderPay(data);
                setpaymentsuccess(true);
                setpaymentloading(false);
            }
            catch(err){
                setpaymenterror(true);
                setpaymentloading(false);
                console.log(err);
            }
        };
        fetchdata();
    };

    return loading?(<LoadingBox />):
    error?<ErrorMessage>Could not fetch the Order Details</ErrorMessage>: 
    (
        <div className="form-container">
            <h3>Order {order._id}</h3>
            <div className="container">
                <div className="left-col">
                    <div className="div1">
                        <h5>Shipping</h5>
                        <div><strong>Name: </strong> {order.shippingAddress.fullName}</div>
                        <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country }
                        {
                            order.isDelivered?(
                            <div style={{display: "flex",color: "green",width: "100%", background: "#00FA9A",height: "3.5rem",
                                justifyContent: "center",marginTop: "1em",alignItems: "center"}}>
                                Delivered at {order.deliveredAt}
                            </div>)
                            :(<ErrorMessage>Not Delivered</ErrorMessage>)
                        }
                    </div>
                    <div className="div1">
                        <h5>Payment</h5>
                        <div><strong>Method: </strong> {order.paymentMethod}</div>
                        {
                            order.isPaid?(
                            <div style={{display: "flex",color: "green",width: "100%", background: "#00FA9A",height: "3.5rem",
                                justifyContent: "center",marginTop: "1em",alignItems: "center"}}>
                                Paid at {order.paidAt}
                            </div>)
                            :(<ErrorMessage>Not Paid</ErrorMessage>)
                        }
                    </div>
                    <div className="div1">
                        <h5>Order Items</h5>
                        <div>
                            {
                                order.orderItems.map(el=>(
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
                        <div><strong>${order.itemsPrice.toFixed(2)}</strong></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between',margin: '0.5em'}}>
                        <div>Shipping Cost</div>
                        <div><strong>${order.shippingPrice.toFixed(2)}</strong></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between',margin: '0.5em'}}>
                        <div>Tax</div>
                        <div><strong>${order.taxPrice.toFixed(2)}</strong></div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between',margin: '0.5em'}}>
                        <div><strong>Order Total</strong></div>
                        <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                    </div>
                    {!order.isPaid && (
                        <div>
                        {!sdkReady ? (
                            <LoadingBox />
                        ):
                        (
                            <div>
                            {paymenterror&&<ErrorMessage>Payment is Unsuccessful</ErrorMessage>}
                            {paymentloading&&<LoadingBox />}
                            <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={successPaymentHandler}
                            ></PayPalButton>
                            </div>
                        )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default OrderScreen;