 import  { z } from "zod";
import { Types } from "mongoose";
 export const messageSchema = z.object({
  content: z.string().trim().min(2).max(100),

    receiverId: z.string().trim().min(2).max(100).refine((value)=>{

       return Types.ObjectId.isValid(value);
    }

    ),

 })

export const identityResponseSchema = z.object({
  status: z.enum(['accepted', 'rejected']),
})
