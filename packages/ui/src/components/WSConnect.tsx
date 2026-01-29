'use client'
import { useEffect, useState } from "react";
import CanvasBody from "./CanvasBody";
import { WS_URL } from "@repo/common/config";

export default function WSConnect({ roomId }:{
    roomId: number
}){
    const [ws,setWS] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=${localStorage.getItem('token')?.split(' ')[1]}`);
        const userId = localStorage.getItem('userId');
        console.log(userId);
        ws.onopen = (event)=>{
            setWS(ws);
            ws.send(JSON.stringify({
                type:'join_room',
                roomId,
                userId
            }))
        };

    },[])

    if(!ws){
        return<div>
            Loading . . .
        </div>
    }

    return(
        <CanvasBody roomId={roomId} ws={ws} />
    )
}