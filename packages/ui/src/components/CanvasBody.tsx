'use client';
import { useEffect, useRef } from "react";
import { initDraw } from "../draw/draw";

export default function CanvasBody({ roomId, ws }:{
    roomId: number,
    ws: WebSocket
}){

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{

        if(canvasRef.current){
            initDraw(canvasRef.current, roomId, ws);
        }

    },[canvasRef]
)
    return(
        <div>
            <canvas ref={canvasRef} height="1000" width="1000"/>
        </div>
    )
}