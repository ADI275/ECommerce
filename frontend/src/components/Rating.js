import React from 'react';

const Rating = (props) => {
    const {rating,numReviews}=props;
    return (
        <div>
            <i className={(rating>=1?"fa fa-star colour":(rating>=0.5)?"fa fa-star-half-o colour":"fa fa-star-o colour")}></i>
            <i className={(rating>=2?"fa fa-star colour":(rating>=1.5)?"fa fa-star-half-o colour":"fa fa-star-o colour")}></i>
            <i className={(rating>=3?"fa fa-star colour":(rating>=2.5)?"fa fa-star-half-o colour":"fa fa-star-o colour")}></i>
            <i className={(rating>=4?"fa fa-star colour":(rating>=3.5)?"fa fa-star-half-o colour":"fa fa-star-o colour")}></i>
            <span style={{margin: '0.5em', color:"blue"}}>{numReviews} reviews</span>
        </div>
    );
}
 
export default Rating;