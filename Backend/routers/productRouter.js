import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Data from '../Data.js';
import Product from '../models/productModel.js';

const productRouter=express.Router();

productRouter.get('/',expressAsyncHandler(async(req,res)=>{
    const products=await Product.find({}); // this will find all the data and send it to us (fetching data from monogdb database)
    // console.log(products);
    res.send(products);
}));
productRouter.get('/seed', expressAsyncHandler(async(req,res)=>{
    // await Product.remove({}); //this removes all the data from database
    const createdProducts=await Product.insertMany(Data.products);
    res.send({createdProducts});
}));
productRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    // console.log(product);
    if(product)
        res.send(product);
    else
        res.status(404).send({message: "Product Not Found"})
}));

export default productRouter;