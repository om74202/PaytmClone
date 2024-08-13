const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://ommishra74202:Om%40742002@clustertesting.ginulaa.mongodb.net/dbPaytm");
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    first_name:String,
    last_name:String

});

const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});
const Account=mongoose.model("Account",accountSchema);
const User=mongoose.model("User",userSchema);
module.exports={
    User,
    Account
};