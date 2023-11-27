import axios from 'axios';
import apiUrl from './apiConfig';

const endpoint = `${apiUrl}saveTickets`
const saveTickets = ( userData, gameId, numbers, counter = null ) => {
    return axios.post(endpoint, { userData, gameId, numbers, counter} );
};

export {
    saveTickets
};