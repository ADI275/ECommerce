import React from 'react';
import Rating from './Rating';
import {Link} from 'react-router-dom'; 
import './Card.css';

const Card = (props) => {
    const {product}=props;
    return (
        <div className="card">
            <Link to={`/product/${product._id}`}><img className="card-img-top" src={product.image} alt={product.name}></img></Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h5 className="card-title">{product.name}</h5>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <div><strong>${product.price}</strong></div>
            </div>
        </div>
    );
}
 
export default Card;