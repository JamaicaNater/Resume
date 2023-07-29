import axios from "axios"; 

const API_BASE_URL = 'http://localhost:3000'

export const ApiController = {
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
    }
};

async function genericGet(endpoint) {
    try {
        // Send a GET request to the API
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
}

