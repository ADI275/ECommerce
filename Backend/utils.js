import jwt from 'jsonwebtoken';
// we will store some utility functions here

export const generateToken=(user)=>{
    return jwt.sign({ // this is used to generate token (jasonwebtoken)
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },process.env.JWT_SECRET||"somethingsecret",
    {
        expiresIn: '30d'
    });
};
// jwt takes 3 parameters 

export const isAuth=(req,res,next)=>{ // creating a middleware for orderRouter for authenticating requests
    const authorization=req.headers.authorization; // used for authenticating
    if(authorization)
    {
        const token=authorization.slice(7,authorization.length); // Bearer XXXXX ,ie, our token starts from 7th index
        jwt.verify(token,process.env.JWT_SECRET||'somethingsecret',(err,decode)=>{
            if(err)
                res.status(401).send({message: 'Invalid Token'});
            else
            {
                req.user=decode; // jwtverify returns the data of the user in decode
                next();
            }
        }); // used to decrypt the token
    }
    else
        res.status(401).send({message: 'No Token'});
}