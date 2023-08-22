import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.CLIENT_ID ?? '');

export async function verifyToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID ?? '',
    });
    const payload = ticket.getPayload();
    return payload
  } catch (error) {
    console.log(error);
    throw new Error('Received invalid token');
  }
}