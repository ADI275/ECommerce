import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); // middleware for parsing json data

mongoose.connect(process.env.MONGODB_URL||'mongodb://localhost/amazonclone',
{
    useNewUrlParser: true, // these are written to not get any warnings
    useUnifiedTopology: true,
    useCreateIndex: true
}); // this is used to connect to the mongo db database

app.use('/api/users',userRouter); // middleware for routing (for getting users)
app.use('/api/products',productRouter); // (for getting products)
app.use('/api/orders',orderRouter);

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID||'sb'); // sb stands for sandbox
})
app.get('/',(req,res)=>{
    res.send("server is ready");
});

app.use((err,req,res,next)=>{ // this middleware is used for express async handler for displaying err
    res.status(500).send({message: err.message});
})
const port=process.env.port||5000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})