import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import ErrorMessage from '../components/ErrorMessage';
import './ProductScreen.css';

const ProductScreen = (props) => {
    const [product,setproduct]=useState([]);
    const [loading,setloading]=useState(false); // for slow networks loading screen would be displayed
    const [error,seterror]=useState(false); // if error is cought error message would be displayed
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setloading(true);
                const {data} =await axios.get(`/api/products/${props.match.params.id}`);
                setloading(false); // if no err is catched then set loading back to false again
                setproduct(data);
            }
            catch(err){
                seterror(err.message);
                setloading(false);
            }
        };
        fetchData();
    },[]);
    
    const [qty,setqty]=useState(1); 
    const size=product.countInStock>10?10:product.countInStock;

    // getting state from props
    const {cart}=props;
    const {setcart}=props;
    const cartHandler=()=>{
        // props.history.push(`/cart/${product._id}?qty=${qty}`); // history is used to change the route
        window.alert("Your Product has been added to Cart")
        
        const fetchData=async()=>{
            try{
                const {data}=await axios.get(`/api/products/${props.match.params.id}`);
                setqty(qty);
                const tempexistingItem=cart.cartItems.find(el=>el.product===props.match.params.id);
                if(tempexistingItem) // if item is already present in the cart just replace that item
                {
                    const tempcartstate={...cart};
                    const index=tempcartstate.cartItems.findIndex(el=>el.product===props.match.params.id)
                    const temp={...tempcartstate.cartItems[index]}
                    temp.qty=qty;
                    tempcartstate.cartItems[index]=temp;
                    setcart({
                        ...tempcartstate
                    });
                    localStorage.setItem("cart",JSON.stringify({
                        ...tempcartstate
                    }));
                }
                else
                {
                    setcart({
                        ...cart,
                        cartItems: [...cart.cartItems,
                        {
                            name: data.name,
                            image: data.image,
                            price: data.price,
                            countInStock: data.countInStock,
                            product: data._id,
                            qty
                        }]
                    });
                    localStorage.setItem("cart",JSON.stringify({
                        ...cart,
                        cartItems: [...cart.cartItems,
                        {
                            name: data.name,
                            image: data.image,
                            price: data.price,
                            countInStock: data.countInStock,
                            product: data._id,
                            qty
                        }]
                    }));
                }
            }
            catch(err){
                console.log(err.message);
            }
        };
        fetchData();
        
    }

    useEffect(()=>{
        const tempcart=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")): {cartItems: [],shippingAddress: {}};
        if(tempcart.cartItems.length>0)
        {
            const tempitem=tempcart.cartItems.filter(el=>el.product===props.match.params.id)
            if(tempitem.length>0)
                setqty(tempitem[0].qty);
        }
    },[]);

    return (
        <div>
            {
                (loading)?<LoadingBox />:
                (error)?<ErrorMessage>{error}</ErrorMessage>:
                <div className="container">
                    <div className="cols">
                        <img className="main-image" src={product.image}></img>
                    </div>
                    <div className="cols">
                        <h3>{product.name}</h3>
                        <Rating rating={product.rating} numReviews={product.numReviews} />
                        <p>Price: ${product.price}</p>
                        <p>Description:-</p>
                        <p>{product.description}</p>
                        <div>Images:</div>
                        <img className="image" src={product.image}></img>
                    </div>
                    <div className="cols cart">
                        <div className="seller">Seller: <div className="brand">{product.brand}</div></div><br></br>
                        <div className="price-container">Price: <div className="price">${product.price}</div></div><br></br>
                        <div className="status">Status<div className={(product.countInStock>0)?"success":"fail"}>{product.countInStock>0?"In-Stock":"Unavailable"}</div></div><br></br>
                        {
                            product.countInStock>0 && (
                                <>
                                    <div style={{marginTop: "3px"}}>
                                        Qty 
                                        <span style={{marginLeft: "0.5em"}}>
                                            <select value={qty} onChange={(e)=>setqty(e.target.value)}>
                                                {
                                                    [...Array(size).keys()].map(idx=>(
                                                        <option key={idx+1} value={idx+1}>
                                                            {idx+1}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </span>
                                    </div>
                                    <div style={{marginTop: '0.5em'}} className="btn button" onClick={cartHandler}><button>Add to Cart</button></div>
                                </>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    );
}
 
export default ProductScreen;