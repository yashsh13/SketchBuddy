import { Router } from "express";
import { prismaClient } from "@repo/db/client";

const userRouter = Router();

userRouter.post('/signup',(req,res)=>{
    return res.json({
        message:"You haved signed up"
    })
})

userRouter.post('/login',(req,res)=>{
    return res.json({
        message:"You have logged in"
    })
})

export default userRouter as Router;