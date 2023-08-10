const axios = require('axios');

async function verify(authCode) {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';

    const tokenParams = new URLSearchParams();
    tokenParams.append('code', authCode);
    tokenParams.append('client_id', process.env.CLIENT_ID);
    tokenParams.append('client_secret', process.env.CLIENT_SECRET);
    tokenParams.append('redirect_uri', process.env.REDIRECT_URI);
    tokenParams.append('grant_type', 'authorization_code');

    axios.post(tokenEndpoint, tokenParams)
    .then(response => {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        console.log(response)
        // Now you can use the access token to make authorized requests on behalf of the user.
    })
    .catch(error => {
        console.error('Error exchanging authorization code for access token:', error.message);
        console.error(error.response.data);
    });
}

const AuthController = {
    authenticate: async (req, res) => {
        query = req.query
        await verify(query.code);
        console.log("query");
        res.json("ok")
    }
}

module.exports = AuthController;

