import axios from 'axios';

const endpoint = 'http://localhost:3001/updateWinners';
const updateWinners = ( winners, prizes,  prizeSum ) => {
    return axios.post(endpoint, { winners, prizes,  prizeSum });
};

export {
    updateWinners
};