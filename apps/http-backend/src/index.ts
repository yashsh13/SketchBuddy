import express from "express";
import userRouter from "./routes/userRoutes";
import roomRouter from "./routes/roomRoutes";

const app = express();

app.use('api/v1/user',userRouter);
app.use('api/v1/room',roomRouter);

app.listen(3001);