import { BACKEND_URL } from "@repo/common/config";
import axios from "axios";

type Shape = {
    type:'Rectangle',
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: 'Circle',
    x: number,
    y: number,
    radius: number
};

export async function initDraw(canvas: HTMLCanvasElement, roomId: number, ws: WebSocket ){
    
    let existingShapes: Shape[] = await getExistingShapes(roomId);

    const ctx = canvas.getContext('2d');

    if(!ctx){
        return 
    }

    clearCanvas(canvas,ctx,existingShapes);

    ws.onmessage = (event) =>{
        const parsedData = JSON.parse(event.data);
        console.log(parsedData.message);
        existingShapes.push(parsedData.message);
        clearCanvas(canvas,ctx,existingShapes);
    };

    let startX = 0;
    let startY = 0;
    let start = false;

    canvas.addEventListener('mousedown',(e)=>{
        start = true;
        startX = e.pageX;
        startY = e.pageY;
    })

    canvas.addEventListener('mousemove',(e)=>{
        if(start){
            let width = e.pageX - startX;
            let height = e.pageY - startY;
            
            clearCanvas(canvas,ctx,existingShapes);
            ctx.strokeStyle = '#705400';
            ctx.strokeRect(startX,startY,width,height);
        }
    })

    canvas.addEventListener('mouseup',(e)=>{
        start = false;
        let width = e.pageX - startX;
        let height = e.pageY - startY;

        const shape: Shape = ({
            type: 'Rectangle',
            x: startX,
            y: startY,
            width,
            height
        });

        existingShapes.push(shape);

        ws.send(JSON.stringify({
            type:'chat',
            roomId,
            message: JSON.stringify(shape)
        }))
    })
}

function clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, existingShapes: Shape[]){

    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#FFFBF0';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    existingShapes.forEach(shape => {
        if(shape.type == 'Rectangle'){
            ctx.strokeStyle = '#705400';
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
        }
    })
}

async function getExistingShapes(roomId: number){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/room/chats/${roomId}`);

        console.log(response.data.message);

        return response.data.shapes
    }catch (e){
        console.log('Getting existing shapes error: '+e);
    }
}
