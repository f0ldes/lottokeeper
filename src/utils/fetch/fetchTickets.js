import axios from 'axios';

const endpoint = 'http://localhost:3001/getTickets';
const getTicketsData = ( userId, gameId ) => {
    return axios.post(endpoint, { userId, gameId });
};

export {
    getTicketsData
};