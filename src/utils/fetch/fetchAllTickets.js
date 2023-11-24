import axios from 'axios';

const endpoint = 'http://localhost:3001/getAllTickets';
const getAllTickets = ( gameId ) => {
    return axios.get(endpoint, { gameId });
};

export {
    getAllTickets
};