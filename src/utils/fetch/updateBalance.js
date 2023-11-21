import axios from "axios";

const endpoint = 'http://localhost:3001/updateBalance';
const updateUserBalance = (userData, amount) => {
    return axios.post(endpoint, {userData, amount});
};

export {
    updateUserBalance
};