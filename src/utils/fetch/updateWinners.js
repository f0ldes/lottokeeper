import axios from 'axios';
import apiUrl from './apiConfig';

const endpoint = `${apiUrl}updateWinners`;
const updateWinners = ( winners, prizes,  prizeSum ) => {
    return axios.post(endpoint, { winners, prizes,  prizeSum });
};

export {
    updateWinners
};