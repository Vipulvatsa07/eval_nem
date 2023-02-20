const {UserModel}=require("../model/User.model")
const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()


userRouter.post("/register",async(req,res)=>{
    // res.send("post")
    const { name, email, gender, password, age, city } = req.body;
      const user=await UserModel.find({email})
    if(user.length===0)
    {
        try
        {
           bcrypt.hash(password,5,async(err,hash)=>{
            if(err)
            {
                res.send({"msg":"not registered"})
            }
            else
            {
                const user=new UserModel({name, email, gender, password:hash, age, city})
                await user.save()
                res.send("user registerd")
            }
           })
        }
        catch(err)
        {
            console.log(err)
        }
    }
    else
    {
        res.send({"msg":"register by new id"})
    }
   
    
    
})




userRouter.post("/login",async(req,res)=>{

    const {email,password}=req.body

    try{
        const user=await UserModel.find({email})
        //  console.log(user)
    //   res.send(user)

    if(user.length>0)
    {
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result)
            {
                const token= jwt.sign({userID:user[0]._id},"masai");
                res.send({"msg":"login successfull","tokenID":token})
            }
            else
            {
                res.send({"msg":"wrong credentials"})
            }
        })
    }
    else{
        res.send({"msg":"user id not registered"})
    }
    }
    catch(err){
         console.log("something went wrong while login")
      }

})

module.exports={
    userRouter
}

