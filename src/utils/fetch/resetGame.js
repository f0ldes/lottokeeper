import axios from "axios";
import apiUrl from "./apiConfig";

const endpoint = `${apiUrl}resetGame`;
const resetGameData = (gameData) => {
    return axios.post(endpoint, { gameData });
};

export {
    resetGameData
};