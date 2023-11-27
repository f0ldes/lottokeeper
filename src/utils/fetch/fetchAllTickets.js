import axios from 'axios';
import apiUrl from './apiConfig';

const endpoint = `${apiUrl}getAllTickets`;
const getAllTickets = ( gameId ) => {
    return axios.get(endpoint, { gameId });
};

export {
    getAllTickets
};