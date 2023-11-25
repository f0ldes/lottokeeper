import axios from "axios";

const endpoint = 'http://localhost:3001/resetGame';
const resetGameData = (gameData) => {
    return axios.post(endpoint, { gameData });
};

export {
    resetGameData
};