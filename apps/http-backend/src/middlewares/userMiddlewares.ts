import { Request, Response , NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const userMiddleware = (req: Request,res: Response,next: NextFunction) =>{
    try{
        
        const bearer = req.cookies.token;
        const token = bearer?.split(' ')[1];
        
        const decoded = jwt.verify(token as string,JWT_SECRET);
        
        if(decoded){
            
            //@ts-ignore
            req.id = (decoded as JwtPayload).userId;
            return next();
        }

        return res.status(403).json({
                message:"Unauthorized"
            });

    } catch(e) {
        return res.status(500).json({
            message:"User Middleware error"
        })
    }
}