import axios from 'axios';
import apiUrl from './apiConfig';

const endpoint = `${apiUrl}checkUser`;
const getUserData = ( isAdmin ) => {
    return axios.get(endpoint, { params: {isAdmin} });
};

export {
    getUserData
};