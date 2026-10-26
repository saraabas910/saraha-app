import { config } from 'dotenv';
import { MailjetProvider } from '../../pkg/email/mailjet.js'; 
import { env } from '../config/env.js';
config();

export const mailjetProvider = new MailjetProvider({
    apiKey:process.env.MAILJET_API_KEY,
    apiSecret:process.env.MAILJET_API_SECRET,
    fromEmail:process.env.MAILJET_FROM_EMAIL,
    fromName:process.env.MAILJET_FROM_NAME
 


})




