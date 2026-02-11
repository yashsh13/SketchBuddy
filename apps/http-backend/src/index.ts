import express from "express";
import userRouter from "./routes/userRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL } from "@repo/common/config";

const app = express();

app.use(cors(
    {
        credentials: true,
        origin: FRONTEND_URL
        }
));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/room',roomRouter);

app.listen(3001);