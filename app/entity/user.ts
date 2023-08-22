import { TokenPayload } from 'google-auth-library';

export interface GoogleUser extends TokenPayload {
    username?: string;
    id?: string;
}
