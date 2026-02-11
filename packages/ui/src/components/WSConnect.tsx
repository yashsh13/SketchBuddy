'use client'
import { useEffect, useState } from "react";
import CanvasBody from "./CanvasBody";
import { WS_URL } from "@repo/common/config";

export default function WSConnect({ roomId }:{
    roomId: number
}){
    const [ws,setWS] = useState<WebSocket | null>(null);

    async function connectWS(){
        const token = document.cookie;
        console.log(document.cookie);
        const ws = new WebSocket(`${WS_URL}?token=${(token?.split('=')[1])?.split('%20')[1]}`);

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