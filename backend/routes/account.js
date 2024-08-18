const express=require("express");
const { authMiddleware } = require("../middlewares");
const mongoose=require("mongoose")
const { Account, User } = require("../db");

const accountRoute=express.Router();

accountRoute.get("/balance",authMiddleware,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance
    })
})

accountRoute.post("/transfer",authMiddleware,async (req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    const {amount,to}=req.body;
    const account=await Account.findOne({
        userId:req.userId
    }).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction();
        res.json({
            message:"Insufficient balance"
        })
    }

    const toAccount=await Account.findOne({
        userId:to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction();
        res.json({
            message:"Account not found"
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await toAccount.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message:"Transfer Sucessful"
    })


})

module.exports=accountRoute;