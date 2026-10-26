import { Router } from "express";
import * as messageController from "./controller/message.controller.js";
import { guard } from "../../lib/auth/guard.js";

const messageRouter = Router();

export default messageRouter;

messageRouter.post('/anon' , guard, messageController.sendAnonMessage);
messageRouter.post('/public' , guard, messageController.sendMessage);
messageRouter.get('/my-messages' , guard, messageController.getAllMessages)
messageRouter.post("/:messageId/request-identity", guard, messageController.requestIdentityController);
messageRouter.get('/identity-requests', guard , messageController.getMyIdentityRequests);
messageRouter.patch('/identity-requests/:requestId', guard, messageController.respondToIdentityRequest);
