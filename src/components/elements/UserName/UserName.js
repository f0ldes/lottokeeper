import useRequest from "../../../functions/hook/useRequest";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getUserData } from "../../../functions/fetch/fetchUser";

const UserName = () => {
    const [username, setUsername] = useState(null);
    const { executeRequest, data: userData } = useRequest(getUserData);
    useEffect(() => {
        executeRequest()
    },[]);

    return (
        <Typography>
            {userData && userData ? userData.name : 'Please Enter your name'}
        </Typography>
    )
};

export default UserName;