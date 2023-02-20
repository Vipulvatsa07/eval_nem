const {PostModel}=require("../model/Post.model")
const express=require("express")
const jwt=require("jsonwebtoken")

const postRouter=express.Router()

postRouter.post("/create",async(req,res)=>{
    const payload=req.body

    // res.send("verified")
    try{
        const user=new PostModel(payload)
        await user.save()
        res.send({"msg":"post saved"})

    }
    catch{
res.send({"msg":"not able to create post"})
    }
})


postRouter.get("/",(req,res)=>{
    const token=req.headers.authorization;
    jwt.verify(token,"masai",async(err,decoded)=>{
        if(decoded)
        {
            try
            {
                const posts=await PostModel.find({user:decoded?.userID})
                res.send(posts)
    
            }
            catch(err)
            {
                res.send({"msg":"data not found"})
            }
        }
        else
        {
            res.send({"msg":"data can't reached"})
        }
       
    })
})


postRouter.patch("/update/:id",async(req,res)=>{
    let id=req.params.id
    const payload =req.body
    console.log(id)

    try
    {
await PostModel.findByIdAndUpdate({_id:id},payload)
res.send({"msg":"updated"})
    }
    catch
    {
       res.send({"msg":"not updated"})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    // const payload =req.body
    console.log(id)

    try
    {
await PostModel.findByIdAndDelete({_id:id})
res.send({"msg":"deleted"})
    }
    catch
    {
       res.send({"msg":"not deleted"})
    }
})


module.exports={
    postRouter
}