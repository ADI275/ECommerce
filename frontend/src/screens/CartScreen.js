import React, { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import { Link } from 'react-router-dom';
import './CartScreen.css';

const CartScreen = (props) => {
    // const productId=props.match.params.id;
    // const qty=props.location.search?Number(props.location.search.split('=')[1]):0; // accessing the second element to get the quantity

    const {cart}=props;
    const {setcart}=props;

    const deleteHandler=(props)=>{
        setcart({...cart,cartItems: cart.cartItems.filter(el=>el.product!==props)});
        localStorage.setItem("cart",JSON.stringify({...cart,cartItems: cart.cartItems.filter(el=>el.product!==props)}));
    }
    const checkoutHandler=()=>{
        props.history.push('/signin?redirect=shipping');
    }
    

    return (
        <div className="container">
            <div className="items">
                <h3 className="heading">Shopping Cart</h3>
                {
                    cart.cartItems.length===0?<ErrorMessage>Cart is empty <Link to="/">Go Shopping</Link></ErrorMessage> :
                    <div>
                        {
                            cart.cartItems.map(item=>(
                                
                                    <div key={item.product} className="item-container">
                                        <div className="item"><img className="image" src={item.image} /></div>
                                        <div className="item">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div className="item">
                                            <select value={item.qty} onChange={(e)=>{
                                                const newQty=e.target.value;
                                                const tempcart={...cart};
                                                const idx=tempcart.cartItems.findIndex(el=>el.product===item.product)
                                                const temp1={...tempcart.cartItems[idx]}
                                                temp1.qty=newQty;
                                                tempcart.cartItems[idx]=temp1;
                                                setcart({
                                                    ...tempcart
                                                });
                                                localStorage.setItem("cart",JSON.stringify({
                                                    ...tempcart
                                                }));
                                            }}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(idx=>(
                                                        <option key={idx+1} value={idx+1}>
                                                            {idx+1}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="item">${item.price}</div>
                                        <div className="item">
                                            <button className="btn btn-danger" onClick={()=>deleteHandler(item.product)}>Delete</button>
                                        </div>
                                    </div>
                                
                            ))
                        }
                    </div>
                }
            </div>
            {cart.cartItems.length!==0 && 
                <div className="checkout">
                    <div className="subtotal">
                        <h5>
                            Subtotal ({cart.cartItems.reduce((a,c)=>Number(a)+Number(c.qty),0)}) items: ${cart.cartItems.reduce((a,c)=>a+c.price*c.qty,0)}
                        </h5>
                        <button className="btn checkoutbtn" onClick={checkoutHandler}>Proceed to Checkout</button>
                    </div>
                </div>
            }
        </div>
    );
}
 
export default CartScreen;