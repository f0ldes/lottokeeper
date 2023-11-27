import axios from "axios";
import apiUrl from "./apiConfig";

const endpoint = `${apiUrl}getGame`;
const getGamaData = () => {
    return axios.post(endpoint);
};

export {
    getGamaData
}