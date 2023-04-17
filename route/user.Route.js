const {Router}=require("express")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()

const userRouter=Router()

const {userModel}=require("../model/user.model")



userRouter.post("/signup",async(req,res)=>{
    try{
        const {name,email,password,role}=req.body
        const isUserPresent= await userModel.findOne({email});
        if(isUserPresent){
            return res.status(400).json({"msg":"Already a user , Please login"})
        }
        bcrypt.hash(password, 5, async(err,hash)=>{
            if(err){
                res.send("something went wrong")
            }else{
                const user=new userModel({name,email,password:hash,role})
                await user.save()
                res.send({"msg":"new user has been register to the blog application"})
            }
        })
    }
    catch(err){
        console.log(err)
    }
})


userRouter.post("/login",async(req,res,next)=>{
    try{
        const {email,password}=req.body

        const user=await userModel.findOne({email})
        console.log(user)
        if(!user){
            return res.status(401).json({"msg":"invalid username or password"})

        }

        const token=jwt.sign({userID:user._id},process.env.jwt_secrete,{
            expiresIn:"1 minute"
        })

        const refreshtoken=jwt.sign({userID:user._id},process.env.refresh_secrete,{
            expiresIn:"3 minute"
        })
        res.send({"msg":"login succesfull",token,refreshtoken})

        }
    catch(err){
        console.log(err)
    }
})

module.exports={
    userRouter
}

