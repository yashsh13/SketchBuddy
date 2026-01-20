import { Router } from "express";
import { userMiddleware } from "../middlewares/userMiddlewares.js";
import { createRoomSchema } from "@repo/common/zodSchema";
import { prismaClient } from "@repo/db/client";

const roomRouter: Router = Router();

roomRouter.post('/create',userMiddleware,async (req,res)=>{
    try{
        const parsedBody = createRoomSchema.safeParse(req.body);
        //@ts-ignore
        const userId = req.id;

        if(!parsedBody.success){
            return res.status(400).json({
                message:"Zod Error",
                error:parsedBody.error
            })
        }
        
        const room = await prismaClient.room.create({
            data:{
                slug: parsedBody.data.slug,
                adminid: userId
            }
        })

        return res.json({
            message:"Room Created Successfully",
            roomid: room.id
        })

    } catch(e){
        return res.status(500).json({
            message:"Create Room Error: "+e,
        })
    }
})

export default roomRouter;