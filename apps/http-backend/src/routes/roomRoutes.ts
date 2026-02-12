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

roomRouter.get('/chats/:roomid',userMiddleware, async (req,res)=>{
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

roomRouter.get('/id/:slug', userMiddleware, async(req,res)=>{
    try{
        const slug = String(req.params.slug);
    
        const room = await prismaClient.room.findFirst({
            where:{
                slug: slug
            }
        })

        return res.json({
            message: "Fetched the room id",
            roomId: room?.id
        })

    } catch(e){
        return res.status(500).json({
            message: "Getting Room ID error: "+e
        })
    }
})

roomRouter.get('/all', userMiddleware, async (req,res)=>{
    try{
        const rooms = await prismaClient.room.findMany();

        return res.json({
            message: "Fetched all the rooms",
            rooms: rooms
        })
    }catch (e){
        return res.status(500).json({
            message: "Error in fetching all the rooms: "+e
        })
    }
})

roomRouter.get('/search/:startsWith', userMiddleware, async (req,res)=>{
    try{
        const startsWith = req.params.startsWith;
        
        const rooms = await prismaClient.room.findMany({
            where:{
                slug:{
                    startsWith: startsWith as string,
                    mode: 'insensitive'
                }
            }
        })
        
        return res.json({
            message: "Fetched the searched rooms",
            rooms: rooms
        })
    }catch(e){
        return res.status(500).json({
            message: "Searching Rooms Error",
            error: e
        })
    }
})

export default roomRouter;