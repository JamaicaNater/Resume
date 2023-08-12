import axios from "axios"; 

const API_BASE_URL = 'http://localhost:3000'

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

        const response = await axios.get(`${API_BASE_URL}/${endpoint}${params ?? ''}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
}

