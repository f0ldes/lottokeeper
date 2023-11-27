import axios from 'axios';
import apiUrl from './apiConfig';

const endpoint =  `${apiUrl}getTickets`;
const getTicketsData = ( userId, gameId ) => {
    return axios.post(endpoint, { userId, gameId });
};

export {
    getTicketsData
};