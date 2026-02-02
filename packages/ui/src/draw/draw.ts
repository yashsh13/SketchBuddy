import { getExistingShapes } from "./http";

type Tool = 'None' | 'Line' |'Rectangle' | "Circle";

type Shape = {
    type:'Rectangle',
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: 'Circle',
    centerX: number,
    centerY: number,
    radius: number
} | {
    type: 'Line',
    startX: number,
    startY: number,
    endX: number,
    endY: number
};

export default class Draw {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private existingShapes: Shape[]
    private roomId: number
    private mouseClicked: boolean
    private startX: number
    private startY: number
    private ws: WebSocket
    private tool: Tool

    constructor(canvas: HTMLCanvasElement, roomId: number, ws: WebSocket, tool: Tool){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.mouseClicked = false;
        this.startX = 0;
        this.startY = 0;
        this.ws = ws;
        this.tool = 'None';

        this.init();
        this.initWS();
        this.initMouseHandlers();
    }

    async init(){
        this.existingShapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    initWS(){
        console.log('supp');
        this.ws.onmessage = (event) =>{
            const parsedData = JSON.parse(event.data);
            this.existingShapes.push(JSON.parse(parsedData.message));
            this.clearCanvas();
        };
    }

    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = '#FFFBF0';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.strokeStyle = '#705400';

        this.existingShapes.forEach(shape => {
            if(shape.type == 'Rectangle'){
                this.ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
            } else if ( shape.type == 'Circle'){
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI*2);
                this.ctx.stroke();
                this.ctx.closePath();
            } else if ( shape.type == 'Line'){
                this.ctx.beginPath();
                this.ctx.moveTo(shape.startX,shape.startY);
                this.ctx.lineTo(shape.endX,shape.endY)
                this.ctx.stroke();
            }
        })
    }

    mouseDownEvent = (e: MouseEvent) =>{
        this.mouseClicked = true;
        this.startX = e.pageX;
        this.startY = e.pageY;
    }

    mouseMoveEvent = (e: MouseEvent) =>{
        if(this.mouseClicked){

            this.clearCanvas();
            let width = e.pageX - this.startX;
            let height = e.pageY - this.startY;
            this.ctx.strokeStyle = '#705400';

            if(this.tool == 'Rectangle'){
                this.ctx.strokeRect(this.startX,this.startY,width,height);

            } else if (this.tool == 'Circle'){
                const radius = Math.max(width,height)/2;
                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
    
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI*2);
                this.ctx.stroke();
                this.ctx.closePath();

            } else if ( this.tool == 'Line'){
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX,this.startY);
                this.ctx.lineTo(e.pageX,e.pageY)
                this.ctx.stroke();
            }
        }
    }

    mouseUpEvent = (e: MouseEvent) =>{
        this.mouseClicked = false;
        let width = e.pageX - this.startX;
        let height = e.pageY - this.startY;

        let shape: Shape;

        if(this.tool == 'Rectangle'){
            shape = {
                type: 'Rectangle',
                x: this.startX,
                y: this.startY,
                width,
                height
            };

        } else if( this.tool == 'Circle'){
            const radius = Math.max(width,height)/2;
            shape = {
                type: 'Circle',
                radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius
            }

        } else if (this.tool == 'Line') {
            shape = {
                type: 'Line',
                startX: this.startX,
                startY: this.startY,
                endX: e.pageX,
                endY: e.pageY
            }

        } else {
            return
        }

        this.existingShapes.push(shape);

        this.ws.send(JSON.stringify({
            type:'chat',
            roomId: this.roomId,
            message: JSON.stringify(shape)
        }))
    }

    initMouseHandlers(){
        this.canvas.addEventListener('mousedown', this.mouseDownEvent);
        this.canvas.addEventListener('mousemove',this.mouseMoveEvent);
        this.canvas.addEventListener('mouseup',this.mouseUpEvent);
    }

    removeMouseHandlers(){
        this.canvas.removeEventListener('mousedown', this.mouseDownEvent);
        this.canvas.removeEventListener('mousemove',this.mouseMoveEvent);
        this.canvas.removeEventListener('mouseup',this.mouseUpEvent);
    }

    setTool(tool: Tool){
        this.tool = tool;
    }
    
}