import express from "express";
import userRouter from "./routes/userRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import chatRouter from "./routes/chatRoutes.js";

const app = express();

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000'
        }
));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/room',roomRouter);
app.use('/api/v1/chat',chatRouter);

app.listen(3001);