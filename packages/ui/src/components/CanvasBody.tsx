'use client';
import { useEffect, useRef, useState } from "react";
import Draw from "../draw/draw";
import ToolButton from "./ToolButton";
import { Circle, MousePointer, RectangleHorizontal, Slash } from "lucide-react";
import Button from "./Button";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import { useRouter } from "next/navigation";

export default function CanvasBody({ roomId, ws }:{
    roomId: number,
    ws: WebSocket
}){

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [tool,setTool] = useState<'None' | 'Line' |'Rectangle' | "Circle">('None');
    const [draw,setDraw] = useState<Draw>();
    const router = useRouter();

    useEffect(()=>{
        draw?.setTool(tool);
    },[draw,tool])

    useEffect(()=>{

        if(canvasRef.current){
            const draw = new Draw(canvasRef.current, roomId, ws, tool);
            setDraw(draw);

            return () => {
                draw.removeMouseHandlers();
            }
        }

    },[canvasRef]
)
    return(
        <div className="overflow-hidden w-screen h-screen">
            <div className="fixed top-4 left-10">
                <Button text={"Back"} variant={"secondary"} size={"fit"} icon={<LeftArrowIcon />} onClickHandler={()=>router.push('/dashboard')}/>
            </div>
            <div className="fixed top-3 left-170 border-1 border-dark-cream rounded-md bg-white flex justify-center items-center gap-2 p-3 shadow-xl">
                <ToolButton icon={<MousePointer />} selected={tool == 'None'} onClickHandler={()=>setTool('None')} />
                <ToolButton icon={<Slash />} selected={tool == 'Line'} onClickHandler={()=>setTool('Line')} />
                <ToolButton icon={<RectangleHorizontal />} selected={tool == 'Rectangle'} onClickHandler={()=>setTool('Rectangle')} />
                <ToolButton icon={<Circle />} selected={tool == 'Circle'} onClickHandler={()=>setTool('Circle')} />
            </div>
            <div className="fixed top-5 left-220">
                <Button text={"Clear"} variant={"secondary"} size={"fit"} onClickHandler={()=>draw?.deleteShapes()}/>
            </div>
            <canvas ref={canvasRef} height={window.innerHeight} width={window.innerWidth} />
        </div>
    )
}