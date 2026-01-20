import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"

const wss = new WebSocketServer({port:8080});

interface User{
    ws: WebSocket,
    rooms: string[],
    userId: string
}

const Users: User[] = [];

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

    ws.on("message",(data)=>{
        const parsedData = JSON.parse(data.toString());
    })
});