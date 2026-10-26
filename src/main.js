

config();
import {config} from "dotenv";
import'./lib/db/mongoose.js';
import express from "express";
import userRouter from "./app/user/user.route.js";
import authRouter from "./app/auth/auth.route.js";
import messageRouter from "./app/message/message.route.js";
import cors from "cors";
import { generateCorrelationId } from "./lib/correlation/correlationid.js";
import { env } from "./lib/config/env.js";
import cookieParser from "cookie-parser";


export function createApp() {

const app = express();
app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.static('upload'))
app.use(express.json());
app.use(cookieParser());
app.use(generateCorrelationId);

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/messages", messageRouter);



  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ error: err.message });
    
  });




return app;







}