import axios from 'axios';
import apiUrl from './apiConfig';

const endpoint = `${apiUrl}checkUser`;
const getUserData = async (isAdmin) => {
    const uniqueId = localStorage.getItem('uniqueId');

    const handleResponse = (response) => {
        const { uniqueId, ...userData } = response.data;
        console.log('this is the uniqueId:', uniqueId);
        console.log('this is the userData:', userData);
        return { data: userData }; // Return only the userData, as its expected
    };

    if (!uniqueId) {
        return axios.get(endpoint, { 
            params: { isAdmin },
            withCredentials: true 
        }).then(response => {
            localStorage.setItem('uniqueId', response.data.uniqueId);
            return handleResponse(response); // Handle the response to extract userData
        });
    } else {
        return axios.get(endpoint, {
            params: { isAdmin, uniqueId },
            withCredentials: true 
        }).then(response => {
            return handleResponse(response); // Handle the response to extract userData
        });
    }
};


export {
    getUserData
};