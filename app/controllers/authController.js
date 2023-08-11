const axios = require('axios');

async function authenticate(authCode) {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';

    const tokenParams = new URLSearchParams();
    tokenParams.append('code', authCode);
    tokenParams.append('client_id', process.env.CLIENT_ID);
    tokenParams.append('client_secret', process.env.CLIENT_SECRET);
    tokenParams.append('redirect_uri', process.env.REDIRECT_URI);
    tokenParams.append('grant_type', 'authorization_code');
    tokenParams.append('scope', '');

    try {
        const response = await axios.post(tokenEndpoint, tokenParams);
        
        return {
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expiresIn,
        };
    } catch (error) {
        console.error('Error exchanging authorization code for access token:', error.message);
        console.error(error.response.data);
        throw error;
    }
}

async function authorize(accessToken) {
    try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return {
            sub: response.data.sub,
            name: response.data.name,
            picture: response.data.picture,
            email: response.data.email,
            emailVerified: response.data.email_verified,
        };
    } catch (error) {
        console.error('Error fetching user info:', error.message);
    }
}

const AuthController = {
    authenticate: async (req, res) => {
        try {
            const token = await authenticate(req.query.code);
            const user = await authorize(token.accessToken);
            res.json(`Welcome ${user.name}`)
        } catch (error) {
            console.error(error)
            res.status(500).json("Failed to autheticate")
        }
    }
}

module.exports = AuthController;

