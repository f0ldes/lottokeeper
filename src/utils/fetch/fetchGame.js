import axios from "axios";

const endpoint = 'http://localhost:3001/getGame';
const getGamaData = () => {
    return axios.post(endpoint);
};

export {
    getGamaData
}