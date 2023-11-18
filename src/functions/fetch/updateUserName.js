import axios from "axios";

const endpoint = 'http://localhost:3001/updateUserName';
const updateName = ( newUserName ) => {
    return axios.post(endpoint, { newUserName }); //query or req ??????
};

export {
    updateName
};