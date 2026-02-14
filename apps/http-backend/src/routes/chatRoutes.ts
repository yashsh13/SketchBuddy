import { Router } from "express";
import { userMiddleware } from "../middlewares/userMiddlewares";
import { prismaClient } from "@repo/db/client";

const chatRouter: Router = Router();

chatRouter.get('/:roomid',userMiddleware, async (req,res)=>{
    try{
        const roomId = Number(req.params.roomid);

        const shapes = await prismaClient.chat.findMany({
            select:{
                message: true
            },
            where:{
                roomid: roomId
            },
            orderBy: {
                sentTime: 'desc'
            },
            take:50
        })

        return res.json({
            message: "Fetched all the chats",
            shapes: shapes.map(x=>JSON.parse(x.message))
        })

    } catch (e){
        return res.status(500).json({
            message: "Get chats error: "+e,
        })
    }
})

chatRouter.delete('/:roomid', userMiddleware, async (req,res)=>{
    try{
        const roomId = Number(req.params.roomid);

        const chats = await prismaClient.chat.deleteMany({
            where:{
                roomid: roomId
            }
        })

        return res.json({
            message: "Successfully deleted the chats",
            chats
        })
    }catch (e){
        return res.status(500).json({
            message: "Error in deleting chats",
            error: e
        })
    }
})

export default chatRouter;