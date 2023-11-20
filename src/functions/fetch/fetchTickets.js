import axios from 'axios';

const endpoint = 'http://localhost:3001/getTickets';
const getTicketsData = ( userId ) => {
    return axios.post(endpoint, { userId });
};

export {
    getTicketsData
};