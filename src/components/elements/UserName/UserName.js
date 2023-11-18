import { useContext, useState } from "react";
import { Typography } from "@mui/material";
import Context from "../../context/userContext";


const UserName = () => {
    const { isAdmin } = useContext(Context);
    
    return (
        <Typography>
            {'Please Enter your name'}
        </Typography>
    )
};

export default UserName;