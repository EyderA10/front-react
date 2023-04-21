import axios from 'axios';
import qs from 'qs'

export const apiUrl = import.meta.env.VITE_APP_API_URL;

export const postJob = async (formData) => {
    try {
        const response = await axios.post(`${apiUrl}/api/post-job`, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};

export const getJobs = async (location = '', typeClothing = '') => {
    try {
        if (location !== '' || typeClothing !== '') return await getJobsByFilter(location, typeClothing)
        const response = await axios.get(`${apiUrl}/api/get-jobs`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};

export const getJobById = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/api/get-job/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
}

export const sendQuote = async (payload, id) => {
    try {
        const response = await axios.post(`${apiUrl}/api/send-quote/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
        return error.response.data;
    }
};

const getJobsByFilter = async (location, typeClothing) => {
    const queryParams = qs.stringify({
        location: location,
        typeClothing: typeClothing,
    });

    const url = `${apiUrl}/api/jobs?${queryParams}`;

    const response = await axios.get(url);

    return response.data.data;
};