import axios from 'axios';

const endpoint = 'http://localhost:3001/checkUser';
const getUserData = ( isAdmin ) => {
    return axios.get(endpoint, { params: {isAdmin} });
};

export {
    getUserData
};