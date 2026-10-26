import http from "http";
import {createApp} from "./main.js";
import mongoose from "mongoose";


const server = http.createServer(createApp());

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});


async function shutdown() {

    server.close(async () => {
        await mongoose.connection.disconnect();
        process.exit(0);
    });
}
server.on("SIGINT", shutdown);
//process.on("SIGTERM", shutdown);
server.on("SIGTERM", shutdown);