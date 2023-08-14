const axios = require('axios');

const User = require('../models/user')

async function authenticate(authCode, redirectUri) {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';

    const tokenParams = new URLSearchParams();
    tokenParams.append('code', authCode);
    tokenParams.append('client_id', process.env.CLIENT_ID);
    tokenParams.append('client_secret', process.env.CLIENT_SECRET);
    tokenParams.append('redirect_uri', redirectUri);
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
            console.log(`session: ${req.session?.id}`)
            console.log('Authenticating request')
            const token = await authenticate(req.query.code, req.query.redirect_uri);
            console.log('Authorizing request')
            let user = await authorize(token.accessToken);
    
            const account = await User.findOne({ email: user.email });

            if (account) {
              user = { ...user, id: account._id };
            }
            
            req.session.user = user;
            console.log(`welcome ${user.name}`)
            res.status(account ? 200 : 404).json(user)
        } catch (error) {
            console.error(error)
            res.status(500).json("Failed to autheticate")
        }
    },
    logout: (req, res) => {
        req.session.user = null
        res.status(200).json("Logged out sucessfully")
    }
}

module.exports = AuthController;

