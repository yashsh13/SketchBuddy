import { Router } from "express";
import { userMiddleware } from "../middlewares/userMiddlewares.js";

const roomRouter = Router();

roomRouter.post('/create',userMiddleware,(req,res)=>{
    return res.json({
        message:"Room Created"
    })
})

export default roomRouter as Router;