import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({port:8080});

interface User{
    ws: WebSocket,
    rooms: Number[],
    userId: Number
}

let Users: User[] = [];

async function Auth(token: string){
    try{
        const decoded = await jwt.verify(token,JWT_SECRET);
        
        if(!decoded){
            console.log("Token verification failed")
            return null;
        }

        return (decoded as JwtPayload).userId;

    } catch(e) {
        console.log("WebSocket Auth Error: "+e);
        return null;
    }
}

wss.on("connection",async (ws,request)=>{

    const url = request.url;
    if(!url){
        ws.close();
        return
    }

    const params = new URLSearchParams(url.split('?')[1]);
    const token = params.get("token");
    if(!token){
        ws.close();
        return
    }

    const userId = await Auth(token);

    if(!userId){
        ws.close();
        return
    }

    Users.push({
        ws: ws,
        rooms: [],
        userId: userId
    })

    ws.on("message",async (data)=>{
        const parsedData = JSON.parse(data.toString());
        
        if(parsedData.type === 'join_room'){
            try{
                const user = Users.filter(x => x.userId === userId);
                user[0]?.rooms.push(parsedData.roomId);
            } catch(e) {
                console.log("Error in joining room: "+e);
            }
        }

        if(parsedData.type === 'leave_room'){
            try {
                let user = Users.filter(x => x.userId === userId)[0];
                const rooms = user?.rooms.filter(x => x !== parsedData.roomId);

                if(!user) return; 

                user.rooms = rooms as Number[];

                Users = Users.filter(x => x.userId !== userId);
                Users.push(user);
            } catch (e) {
                console.log("Leaving Room Error");
            }
        }

        if(parsedData.type === 'chat'){
            try {
                await prismaClient.chat.create({
                    data:{
                        userid: userId,
                        message: parsedData.message,
                        roomid: parsedData.roomId
                    }
                })

                const peopleInRoom = Users.filter(x => x.rooms.includes(parsedData.roomId));
                
                peopleInRoom.forEach(x => {
                    if(x.ws !== ws){
                        x.ws.send(JSON.stringify({
                            message: parsedData.message
                        }));
                    }
                })
            } catch (e) {
                console.log("Sending Chat Error: "+e);
            }
        }

    })
});