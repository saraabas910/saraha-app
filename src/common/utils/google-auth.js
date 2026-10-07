import { OAuth2Client } from 'google-auth-library';



  const client = new OAuth2Client();

export async function verifyToken(idToken) {


  try {
  const ticket = await client.verifyIdToken({id_token: idToken, 
    audience: process.env.GOOGLE_OAUTH_CLIENT_ID});
  return ticket.getPayload();


 }catch (error) {
  throw new Error('Invalid token');
 }

}