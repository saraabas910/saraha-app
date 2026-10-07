import {config} from "dotenv";
import'./common/db/mongoose.js';
import express from "express";
import userRouter from "./app/user/user.route.js";
import authRouter from "./app/auth/auth.route.js";
import messageRouter from "./app/message/message.route.js"; 
import cors from "cors";
config();
const app = express();

app.use(cors({origin: 'http://localhost:4200'}));
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/messages", messageRouter);

app.use(express.json());
app.listen(3000  , () => {
    console.log("Server is running on port 3000");
})

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });