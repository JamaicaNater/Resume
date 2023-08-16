export interface GoogleUser {
    id?: string;
    username?: string;
    sub: string;
    name: string;
    picture: string;
    email: string;
    emailVerified: boolean;
}
