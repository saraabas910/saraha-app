import * as userRepository from '../../user/repository/user.repository.js';
import * as messageRepository from '../repository/message.repository.js';


export async function sendMessage(content, senderId, receiverId) {
    const sender = await userRepository.findUserByid(senderId);
    if (!sender) {
        throw new Error('Sender not found');
    }

    const receiver = await userRepository.findUserByid(receiverId);
    if (!receiver) {
        throw new Error('Receiver not found');
    }

    return messageRepository.createMessage(content, senderId, receiverId, false);
}


export async function sendAnonMessage(content, senderId, receiverId) {
    const receiver = await userRepository.findUserByid(receiverId);
    if (!receiver) {
        throw new Error('Receiver not found');
    }

    return messageRepository.createMessage(content, senderId, receiverId, true);
}


export async function getAllMessages(userId){

 const messages= await messageRepository.getAllMessages(userId);
 if (messages.lenght ===0 ){
   throw new Error('no messages found');
 }
 return messages;

}

export async function requestIdentity(messageId, receiverId) {
  
    const message = await messageRepository.findMessageById(messageId);
    if (!message) {
        throw new Error("Message not found");
    }
    if (message.receiver.toString() !== receiverId) {
        throw new Error("this message was not sent to you");
    }
    const existing = await messageRepository.findIdentityRequestByMessageId(messageId);
    if (existing) {
        throw new Error("You already requested the identity for this message");
    }
    return await messageRepository.createIdentityRequest(
        messageId, 
        receiverId, 
        message.sender
    );
}

export async function getIdentityRequestsForSender(senderId) {
    return await messageRepository.getIdentityRequestsForSender(senderId);
}



export async function handleIdentityRequest(requestId, senderId, status) {
    const request = await messageRepository.findIdentityRequestById(requestId);
    if (!request) {
        throw new Error("Identity request not found");
    }

    if (request.sender.toString() !== senderId) {
        throw new Error(" you are not the sender of this message");
    }

    const updated = await messageRepository.updatePendingIdentityRequestStatus(requestId, status);
    if (!updated) {
        throw new Error("This request was already answered");
    }

    return updated;
}