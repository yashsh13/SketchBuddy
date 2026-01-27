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

export function initDraw(canvas: HTMLCanvasElement ){
    
    let existingShapes: Shape[] = [];
    const ctx = canvas.getContext('2d');

    if(!ctx){
        return 
    }

    ctx.fillStyle = '#FFFBF0';
    ctx.fillRect(0,0,canvas.width,canvas.height);

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

        existingShapes.push({
            type: 'Rectangle',
            x: startX,
            y: startY,
            width,
            height
        })
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
