import axios from 'axios';

const endpoint = 'http://localhost:3001/checkUser';
const getUserData = () => {
    return axios.get(endpoint)
};

export {
    getUserData
};