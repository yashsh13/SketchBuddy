'use client'
import { useEffect, useState } from "react";
import CanvasBody from "./CanvasBody";
import { WS_URL } from "@repo/common/config";

export default function WSConnect({ roomId }:{
    roomId: number
}){
    const [ws,setWS] = useState<WebSocket | null>(null);

    async function connectWS(){
        const token = await cookieStore.get('token');
        console.log(document.cookie);
        const ws = new WebSocket(`${WS_URL}?token=${(token?.value)?.split('%20')[1]}`);

        ws.onopen = (event)=>{
                    setWS(ws);
                    ws.send(JSON.stringify({
                        type:'join_room',
                        roomId
                    }
                    ))};
    }

    useEffect(()=>{
        connectWS();
    },[]);

    if(!ws){
        return<div>
            Loading . . .
        </div>
    }

    return(
        <CanvasBody roomId={roomId} ws={ws} />
    )
}