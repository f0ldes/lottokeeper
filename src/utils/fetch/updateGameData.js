import axios from "axios";
import apiUrl from "./apiConfig";

const endpoint = `${apiUrl}updateGame`;
const updateGameData = (gameData) => {
    return axios.post(endpoint, { gameData });
};

export {
    updateGameData
};