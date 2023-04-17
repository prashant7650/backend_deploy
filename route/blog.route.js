const {Router}=require("express")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()

const blogRouter=Router()

const {blogModel}=require("../model/blog.model")

blogRouter.post("/add",async(req,res)=>{
    try{
        const payload=req.body
        const blog=new blogModel(payload)
        await blog.save()
        res.send("blogs are created")

    }
    catch(err){
        console.log(err)
    }
})

blogRouter.get("/allblog",async(req,res)=>{
    let query=req.query
    console.log(query)
    try{
      const users=await blogModel.find(query)
      res.send(users)

        res.send("blogs are updated")

    }
    catch(err){
        console.log(err)
    }
})
blogRouter.patch("/update/:id",async(req,res)=>{
    try{
        const blodID=req.params.id
        await blogModel.findByIdAndUpdate({_id:blodID})

        res.send("blogs are updated")

    }
    catch(err){
        console.log(err)
    }
})
blogRouter.delete("/delete/:id",async(req,res)=>{
    try{
        const blodID=req.params.id
        await blogModel.findByIdAndDelete({_id:blodID})

        res.send("blogs are deleted")

    }
    catch(err){
        console.log(err)
    }
})





module.exports={
    blogRouter
}

