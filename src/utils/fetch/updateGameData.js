import axios from "axios";

const endpoint = 'http://localhost:3001/updateGame';
const updateGameData = (gameData) => {
    return axios.post(endpoint, { gameData });
};

export {
    updateGameData
};