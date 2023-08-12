import axios from "axios"; 

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, // Include cookies in the request
});

export const ApiController = {
    authenticate: async (code, redirect_uri) => {
        return genericGet('auth', {code: code, redirect_uri: redirect_uri});
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

    getUsers: async () => {
        return genericGet('user');
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
        let params = undefined;
        if (queryParams) {
            params = []
            params.push('?');
            const paramStrings = Object.keys(queryParams).map((param) => {
                return `${param}=${queryParams[param]}`;
            });
            params.push(paramStrings.join('&'));
            params = params.join('')
            console.log(params);
        }

        const response = await instance.get(`/${endpoint}${params ?? ''}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
}

