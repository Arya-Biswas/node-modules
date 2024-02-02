const express=require('express');
const router=express.Router();
const userModel=require("./mongo");
router.get("/create",async function(req,re){
const data=await userModel.create({
    name:"Arya",
    age:23,
    username:"Arya@5"
},
{
    name:"Amit",
    age:27,
    username:"Amit_bhau"
})
res.send(data);
}) 
module.exports=router;