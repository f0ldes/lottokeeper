import axios from "axios";
import apiUrl from "./apiConfig";

const endpoint = `${apiUrl}updateBalance`;
const updateUserBalance = (userData, amount) => {
    return axios.post(endpoint, {userData, amount});
};

export {
    updateUserBalance
};