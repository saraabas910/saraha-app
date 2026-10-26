import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env.js';



  const client = new OAuth2Client();

export async function verifyToken(idToken) {


  try {
  const ticket = await client.verifyIdToken({id_token: idToken, 
    audience: env.google.WebclientId});
  return ticket.getPayload();


 }catch (error) {
  throw new Error('Invalid token');
 }

}