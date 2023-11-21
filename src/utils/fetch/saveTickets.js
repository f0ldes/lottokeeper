import axios from 'axios';

const endpoint = 'http://localhost:3001/saveTickets'
const saveTickets = ( userData, gameId, numbers ) => {
    return axios.post(endpoint, { userData, gameId, numbers});
};

export {
    saveTickets
};