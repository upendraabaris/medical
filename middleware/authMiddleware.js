const jwt = require('jsonwebtoken');
const userModel = require('../models/user/userModel')

const authMiddleware = async (req,res,next)=>{
    next();
}

const checkDomain = async (req,res,next)=>{
    next();
}

const isAdmin = async (req,res,next)=>{
    next();
}

const authMiddlewareNotCompulsory = async (req,res,next)=>{
    next();
}

const verifyToken = async(req,res,next)=>{
    try{
        const token = req.headers.authorization

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        console.log(token)
        if(token){
            let user = jwt.verify(token.replace('Bearer ', ''), "upendrajain")
            console.log(user);
            const user1 = await userModel.findOne({_id:user.user})
            if(user1 == null)
            {
                throw new Error("You are not authorized.")
            }
            // res.status(201).send(user1)
            console.log(token)
            req.user = user.user
            next()
        }else
        {
            res.send("Invalid login details")
        }
    }catch(error){
        res.status(400).send("Invalid token")
    }
}

module.exports = {authMiddleware, checkDomain, isAdmin, authMiddlewareNotCompulsory, verifyToken }