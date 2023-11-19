import axios from 'axios';

const endpoint = 'http://localhost:3001/saveTickets'
const saveTickets = ( userId, gameId, numbers ) => {
    return axios.post(endpoint, { userId, gameId, numbers});
};

export {
    saveTickets
};