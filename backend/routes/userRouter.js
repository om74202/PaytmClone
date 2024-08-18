const express=require('express');
const jwt=require("jsonwebtoken");
const zod=require("zod");
const {User, Account}=require("../db");
const JWT_SECRET = require('./config');
const { authMiddleware } = require('../middlewares');


const userRoute=express.Router();

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    first_name:zod.string(),
    last_name:zod.string()
})
userRoute.post("/signup",async (req,res)=>{
    const body=req.body;
    const {success}=signupSchema.safeParse(body);
    console.log(success);
    if(!success){
        return res.status(411).json({
            success,
            message:"user already exists/wrong "
        })
    }

    const user= await User.findOne({
        username:body.username
    })

    if(user!=null && user._id){
        return res.json({
            message:"email is already taken"
        })
    }

    const dbUser=await User.create(body);
    const  userId=dbUser._id;  

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET);

    
    res.json({
        message:"User has been sucessfully created",
        token:token
    });

});

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

userRoute.post("/signin",async (req,res)=>{
    const body=req.body;
    const {success}=signinSchema.safeParse(body);
    if(!success){
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

const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

userRoute.put("/",authMiddleware,async (req,res)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"error while updating information"
        })
    }
    await User.updateOne(req.body,{
        id:req.userId
    })
    res.json({
        message:"Updated sucessfully"
    })
})

userRoute.get("/bulk",async (req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[{
            first_name:{
                "$regex":filter
            }
        },{
            last_name:{
                "$regex":filter
            }
        }]
    })
    console.log(filter);
    if (users.length === 0) {
        console.log("No users found with filter:"); // Log for debugging
     }
    res.json({
        user:users.map(user=>({
            filter,
            username:user.username,
            firstName:user.first_name,
            lastName:user.last_name,
            _id:user._id

        }))
    })
})


module.exports=userRoute;