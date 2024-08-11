const express=require('express');
const jwt=require("jsonwebtoken");
const zod=require("zod");
const {User}=require("../db");
const JWT_SECRET = require('./config');

const userRoute=express.Router();

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})
userRoute.post("/signup",async (req,res)=>{
    const body=req.body;
    const {sucess}=signupSchema.safeParse(body);
    if(!sucess){
        return res.status(411).json({
            message:"user already exists/wrong input"
        })
    }

    const user=User.findOne({
        username:body.username
    })

    if(user._id){
        return res.json({
            message:"email is already taken"
        })
    }

    const dbUser=await User.create(body);
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET);
    res.json({
        message:"User has been sucessfully created",
        token:token
    })

});

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

userRoute.post("/signin",async (req,res)=>{
    const body=req.body;
    const {sucess}=signinSchema.safeParse(body);
    if(!sucess){
        return res.status(411).json({
            message:"Invalid Input"
        })
    }
    const user=await User.findOne({
        username:body.username,
        password:body.password
    })
   
    if(user._id){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET)
        res.json({
            token:token
        })
        return;
    }
    res.status(411).json({
        message:"error while logging in the webpage"
    })
})

module.exports=userRoute;