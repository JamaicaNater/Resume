import axios from "axios"; 

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // Include cookies in the request
});

export const ApiController = {
    authenticate: async (code, redirect_uri) => {
        return genericGet('auth', {code: code, redirect_uri: redirect_uri});
    }, 

    logout: async () => {
        return genericGet('auth/logout');
    }, 

    getExperience: async () => {
        return genericGet('experience');
    },

    getEducation: async () => {
        return genericGet('education');
    },

    getProjects: async () => {
        return genericGet('projects');
    },

    getReferences: async () => {
        return genericGet('reference');
    },

    getMe: async () => {
        return genericGet('user/me');
    }, 

    getUsers: async () => {
        return genericGet('user');
    }, 

    createUser: async (user) => {
        console.log(user)
        return genericPost('user', user);
    }, 

    getTags: async () => {
        return genericGet('tag');
    },

    getJobs: async () => {
        return genericGet('job');
    }
};

async function genericGet(endpoint, queryParams) {
    try {
        let params = '';
        if (queryParams) {
            const paramStrings = Object.keys(queryParams).map((param) => {
                return `${param}=${queryParams[param]}`;
            });
            params = '?' + paramStrings.join('&');
        }

        const response = await instance.get(`/${endpoint}${params ?? ''}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function genericPost(endpoint, payload, queryParams) {
    try {
        let params = '';
        if (queryParams) {
            const paramStrings = Object.keys(queryParams).map((param) => {
                return `${param}=${queryParams[param]}`;
            });
            params = '?' + paramStrings.join('&');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length,
            },
        };

        const response = await instance.post(`/${endpoint}${params ?? ''}`, payload, config);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
}

