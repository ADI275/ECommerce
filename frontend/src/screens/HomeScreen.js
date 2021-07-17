import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import LoadingBox from '../components/LoadingBox';
import ErrorMessage from '../components/ErrorMessage';

const HomeScreen = () => {
    // fetching data from backend
    const [products,setproducts]=useState([]);
    const [loading,setloading]=useState(false); // for slow networks loading screen would be displayed
    const [error,seterror]=useState(false); // if error is cought error message would be displayed
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setloading(true);
                const {data} =await axios.get('/api/products');
                setloading(false); // if no err is catched then set loading back to false again
                setproducts(data);
            }
            catch(err){
                seterror(err.message);
                setloading(false);
            }
        };
        fetchData();
    },[]); // ,[]) this means it will run only once. if you remove this it will make calls to backend continuously
    return (
        <div>
            {
                (loading)?<LoadingBox />:
                (error)?<ErrorMessage>{error}</ErrorMessage>:
                <div className="cards">
                    {products.map(product=>(
                    <Card key={product._id} product={product}/>
                    ))}
                </div>
            }
        </div>
    );
}
 
export default HomeScreen;