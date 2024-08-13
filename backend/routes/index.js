const express=require("express");
const userRoute = require("./userRouter");
const accountRoute = require("./account");

const route=express.Router();
route.use("/user",userRoute);
route.use("/account",accountRoute);

module.exports=route;