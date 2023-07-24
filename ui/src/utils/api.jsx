import axios from "axios"; 

const API_BASE_URL = 'http://localhost:3000'

async function getExperience() {
    return genericGet('experience');
}

async function getEducation() {
    return genericGet('education');
}

async function getProjects() {
    return genericGet('project');
}

async function getReferences() {
    return genericGet('reference');
}

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