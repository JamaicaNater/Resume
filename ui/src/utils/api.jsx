import axios from "axios"; 

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // Include cookies in the request
});

export const ApiController = {
    authenticate: async (code, redirect_uri) => {
        return genericGet('auth', {code: code, redirect_uri: redirect_uri});
    },
    
    logout: async (queryParams) => {
        return genericGet('auth/logout', queryParams);
    },
    
    getExperience: async (queryParams) => {
        return genericGet('experience', queryParams);
    },
    
    getEducation: async (queryParams) => {
        return genericGet('education', queryParams);
    },
    
    getProjects: async (queryParams) => {
        return genericGet('projects', queryParams);
    },
    
    getReferences: async (queryParams) => {
        return genericGet('references', queryParams);
    },
    
    getMe: async (queryParams) => {
        return genericGet('users/me', queryParams);
    },
    
    getUsers: async (queryParams) => {
        return genericGet('users', queryParams);
    },
    
    createUser: async (user, queryParams) => {
        return genericPost('users', user, queryParams);
    },
    
    getTags: async (queryParams) => {
        return genericGet('tags', queryParams);
    },
    
    getJobs: async (queryParams) => {
        return genericGet('jobs', queryParams);
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
