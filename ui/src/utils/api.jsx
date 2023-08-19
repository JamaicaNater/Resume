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

    createExperience: async (experience, queryParams) => {
        return genericPost('experience', experience, queryParams);
    },

    updateExperience: async (experience, id, queryParams) => {
        return genericPut('experience', id, experience, queryParams);
    },
    
    getEducation: async (queryParams) => {
        return genericGet('education', queryParams);
    },

    updateEducatione: async (education, id, queryParams) => {
        return genericPut('education', id, education, queryParams);
    },

    createEducation: async (education, queryParams) => {
        return genericPost('education', education, queryParams);
    },
    
    getProjects: async (queryParams) => {
        return genericGet('projects', queryParams);
    },

    updateProject: async (project, id, queryParams) => {
        return genericPut('projects', id, project, queryParams);
    },

    createProject: async (project, queryParams) => {
        return genericPost('projects', project, queryParams);
    },
    
    getReferences: async (queryParams) => {
        return genericGet('references', queryParams);
    },

    updateReference: async (reference, id, queryParams) => {
        return genericPut('references', id, reference, queryParams);
    },

    createReference: async (reference, queryParams) => {
        return genericPost('references', reference, queryParams);
    },
    
    getMe: async (queryParams) => {
        return genericGet('users/me', queryParams);
    },

    updateMe: async (user, queryParams) => {
        return genericPut('users/me', user, queryParams);
    },
    
    getUsers: async (queryParams) => {
        return genericGet('users', queryParams);
    },
    
    register: async (user, queryParams) => {
        return genericPost('auth/register', user, queryParams);
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

async function genericPut(endpoint, id, payload, queryParams) {
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

        const response = await instance.put(`/${endpoint}/${id}${params ?? ''}`, payload, config);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
