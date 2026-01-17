import { Router } from "express";
import { prismaClient } from "@repo/db/client";
import { signUpSchema, logInSchema } from "@repo/common/zodSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const userRouter = Router();

userRouter.post('/signup',async (req,res)=>{
    try{
        const parsedBody = signUpSchema.safeParse(req.body);

        if(!parsedBody.success){
            return res.status(403).json({
                message:"Zod Error",
                error:parsedBody.error
            })
        }

        const hashedPassword = await bcrypt.hash(parsedBody.data.password,5);

        await prismaClient.user.create({
            data:{
                username:parsedBody.data.username,
                password:hashedPassword,
                email:parsedBody.data.email
            }
        })

        return res.json({
            message:"Signed Up Successfully"
        })


    } catch (e){
        return res.status(500).json({
            message:"Error occured in signup endpoint: "+e
        })
    }
})

userRouter.post('/login',async (req,res)=>{
    try{
        const parsedBody = logInSchema.safeParse(req.body);

        if(!parsedBody.success){
            return res.status(403).json({
                message:"Zod error",
                error:parsedBody.error
            })
        }

        const user = await prismaClient.user.findFirst({
                where:{
                    username: parsedBody.data.email
                }
            })

        if(!user){
            return res.status(401).json({
                message:"User with this email does not exist"
            })
        }

        const verified = await bcrypt.compare(parsedBody.data.password,user.password);

        if(!verified){
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }

        const token = jwt.sign({
            userid: user.id
        },JWT_SECRET);

        return res.json({
            message: "Logged in successfully",
            token : token
        })

    } catch (e){
        return res.status(500).json({
            message:"Error occured in Login endpoint: "+e
        })   
    }
})

export default userRouter as Router;