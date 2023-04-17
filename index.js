const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./route/user.Route")
const {blogRouter}=require("./route/blog.route")
const {authMiddleware}=require("./middleware/authenticate.middleware")
const {blacklist}=require("./blacklist/blacklist")
require("dotenv").config()

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome")
})
app.use("/users",userRouter)
app.use("/blogs",blogRouter)

app.get("/data",authMiddleware,(req,res)=>{
    res.send("all data is here")
})
app.get("/logout",authMiddleware,(req,res)=>{
    let token=req.headers.authorization
    blacklist.push(token)
    res.send("logout Succefully")

})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")

    }catch(err){
        console.log(err)
        console.log("not connected to db")
    }
    console.log(`server is running at the ${process.env.port}`)
})