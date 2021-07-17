import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import ErrorMessage from '../components/ErrorMessage';

const OrderHistoryScreen = (props) => {
    const [orderMineList,setOrderMineList]=useState({orders: []});
    const [error,seterror]=useState(false);
    const [loading,setloading]=useState(true);
    const {orders}=orderMineList;
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const User=JSON.parse(localStorage.getItem("user"));
                const {data}=await axios.get('/api/orders/mine',{headers: {authorization: `Bearer ${User.token}`}});
                setOrderMineList({orders: data});
                setloading(false);
            }
            catch(err){
                seterror(true);
                setloading(false);
                console.log(err);
            }
        };
        fetchdata();
    },[]);

    return (
        <div className="form-container">
            <h3>Order History</h3>
            {
                loading?<LoadingBox />:
                error?<ErrorMessage>Could not get the Order History</ErrorMessage>:
                <div style={{width: '100%'}} className="table-responsive-lg">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice.toFixed(2)}</td>
                                    <td>{order.isPaid?order.paidAt.substring(0,10):'No'}</td>
                                    <td>{order.isDelivered?order.deliveredAt.substring(0,10):'No'}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={()=>{
                                            props.history.push(`/order/${order._id}`)
                                        }}>Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}
 
export default OrderHistoryScreen;