const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    name:{type:String,require:true},
    title:{type:String,require:true},
    writer:{type:String,require:true}
    
})

const blogModel=mongoose.model("blog",blogSchema)

module.exports={
    blogModel
}