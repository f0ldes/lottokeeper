import axios from "axios";
import apiUrl from "./apiConfig";

const endpoint = `${apiUrl}updateUserName`;
const updateName = ( newUserName ) => {
    return axios.post(endpoint, { newUserName }); //query or req ??????
};

export {
    updateName
};