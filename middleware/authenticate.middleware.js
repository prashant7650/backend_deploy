const jwt=require("jsonwebtoken")
require("dotenv").config()
const {userModel}=require("../model/user.model")

const {blacklist}=require("../blacklist/blacklist")

const authMiddleware=async (req,res,next)=>{
    try{
        const token=req.headers.authorization
        if(blacklist.includes(token)){
            return res.status(401).send({"msg":"Unauthorized","msg":"you are blacklisted"})
        }
        const decodedtoken=jwt.verify(token,process.env.jwt_secrete)
        console.log(decodedtoken)
        const {userID}=decodedtoken

        const user=await userModel.findOne({_id:userID})
        const role=user.role
        next()
    }
    catch(err){
        console.log(err)
    }
}
module.exports={
    authMiddleware
}