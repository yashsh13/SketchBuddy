import { Request, Response , NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const userMiddleware = (req: Request,res: Response,next: NextFunction) =>{
    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1];

    const decoded = jwt.verify(token as string,JWT_SECRET);

    if(decoded){
        //@ts-ignore
        req.id = (decoded as JwtPayload).userId;
        return next();
    }

    return res.status(403).json({
            message:"Unauthorized"
        });

}