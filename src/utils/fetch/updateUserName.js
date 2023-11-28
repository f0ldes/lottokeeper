import axios from "axios";
import apiUrl from "./apiConfig";

const endpoint = `${apiUrl}updateUserName`;
const updateName = ( newUserName, userData ) => {
    return axios.post(endpoint, { newUserName, userData }); 
};

export {
    updateName
};