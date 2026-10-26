import {Message} from "../model/message.model.js"
import { IdentityRequest } from "../model/identityRequest.model.js";

export async function createMessage(content, senderId, receiverId, isAnonymous = false) {
  const message = await Message.create({
    content,
    sender: senderId,
    receiver: receiverId,
    isAnonymous
  });

  return await Message.findById(message._id).select("-sender");
}

export async function getAllMessages(userId) {
  const messages = await Message.find({ receiver: userId })
    .populate("sender", "name email")
    .sort({ createdAt: -1 })
    .lean();

  return messages.map(m => (m.isAnonymous ? { ...m, sender: undefined } : m));
}


export async function findMessageById(messageId) {
    return await Message.findById(messageId);
}
export async function findMessageWithSender(messageId) {
  return await Message.findById(messageId).populate("sender", "name email");
}

export async function findIdentityRequestById(requestId) {
    return await IdentityRequest.findById(requestId);
}

export async function findIdentityRequestByMessageId(messageId) {
    return await IdentityRequest.findOne({ message: messageId });
}


export async function createIdentityRequest(messageId, receiverId, senderId) {
    const request = await IdentityRequest.create({
        message: messageId,
        receiver: receiverId,
        sender: senderId,
        status: 'pending'
    });

    return await IdentityRequest.findById(request._id)
        .select("-sender")
        .populate("receiver", "name email")
        .populate("message", "content");
}

export async function getIdentityRequestsForSender(senderId) {
    return await IdentityRequest.find({ sender: senderId })
        .select("-sender")
        .populate("receiver", "name email")
        .populate("message", "content createdAt")
        .sort({ createdAt: -1 });
}



export async function updatePendingIdentityRequestStatus(requestId, status) {
    return await IdentityRequest.findOneAndUpdate(
        { _id: requestId, status: 'pending' },
        { status: status },
        { returnDocument: 'after' }
    )
        .populate("receiver", "name email")
        .populate("message", "content");
}
