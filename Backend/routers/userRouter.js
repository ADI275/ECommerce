import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Data from '../Data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAuth } from '../utils.js';

const userRouter=express.Router();

userRouter.get('/seed', expressAsyncHandler(async(req,res)=>{ // express async handler is just used to handle error req
    const createdUser=await User.insertMany(Data.users);
    res.send({createdUser});
}));
userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{ // post req for signing in users
    const user=await User.findOne({email:req.body.email});
    if(user)
    {
        if(bcrypt.compareSync(req.body.password,user.password)) // comparing if the passwords match
        {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message: "Invalid Email or Password"});
}));

userRouter.post('/register',expressAsyncHandler(async(req,res)=>{
    const user=new User({name: req.body.name, email: req.body.email,
    password: bcrypt.hashSync(req.body.password,8)}); // 8 is for automatically generating the hashing
    const createdUser=await user.save(); // this is used to save add new items in mongodb database
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    });
}));

userRouter.get('/:id',expressAsyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(user)
        res.send(user);
    else
        res.status(404).send({message: 'User Not Found'});
}));

userRouter.put('/profile',isAuth,expressAsyncHandler(async(req,res)=>{ // to update the user profile
    const user=await User.findById(req.user._id);
    if(user)
    {
        if(user.name!==req.body.name)
            user.name=req.body.name;
        if(user.email!==req.body.email)
            user.email=req.body.email;
        if(req.body.password)
            user.password=bcrypt.hashSync(req.body.password,8);
        const updatedUser=await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        });
    }
}));

export default userRouter;