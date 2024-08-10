const express=require("express");
const userRoute = require("./userRouter");

const route=express.Router();
route.use("/user",userRoute);

module.exports=route;