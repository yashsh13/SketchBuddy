import express from "express";
import userRouter from "./routes/userRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/room',roomRouter);

app.listen(3001);