import * as messageService from '../service/message.service.js';
import { validate } from '../../../lib/validation/validation.js';
import { messageSchema, identityResponseSchema } from '../dto/msgDto.js';

export async function sendMessage(req, res, next) {
    try {

        const data = validate(messageSchema, req.body);
        const { content, receiverId } = data;
        const senderId = req.user?.id;

        const message = await messageService.sendMessage(content, senderId, receiverId);
        res.status(201).json({ message: 'Message sent successfully'});


}
catch (error) {
    next(error);
}

}

export async function sendAnonMessage(req, res, next) {
    try {
        const data = validate(messageSchema, req.body);
        const { content, receiverId } = data;
        const senderId = req.user.id; 

        const message = await messageService.sendAnonMessage(content, senderId, receiverId);

        res.status(201).json({ message: 'Anonymous message sent successfully', data: message });
    } catch (error) {
        next(error);
    }
}
export async function getAllMessages(req, res , next){

    try{
     const messages = await messageService.getAllMessages(req.user.id);
    res.json({

        message:'ok',
        success:"true",
        data:messages
    })


    } catch(error){
       next(error)
    }



}

export async function requestIdentityController(req, res, next) {
    try {
        const messageId = req.params.messageId;
        const receiverId = req.user.id;

        const identityRequest = await messageService.requestIdentity(messageId, receiverId);

        res.status(201).json({
            message: 'Identity request sent successfully',
            data: identityRequest
        });
    } catch (error) {
        next(error);
    }
}

export async function getMyIdentityRequests(req, res, next) {
    try {
        const senderId = req.user.id;

        const requests = await messageService.getIdentityRequestsForSender(senderId);

        return res.status(200).json({
            success: true,
        
            data: requests
        });
    } catch (error) {
        next(error);
    }
}

export async function respondToIdentityRequest(req, res, next) {
    try {
        const { requestId } = req.params;
        const { status } = validate(identityResponseSchema, req.body);
        const senderId = req.user.id;

        const result = await messageService.handleIdentityRequest(requestId, senderId, status);

        return res.status(200).json({
            success: true,
            message: `Identity request has been ${status} successfully`,
            data: result
        });
    } catch (error) {
        next(error);
    }
}
