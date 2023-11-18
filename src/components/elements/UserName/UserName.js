import { useState } from "react";
import { Typography } from "@mui/material";


const UserName = () => {
    const [username, setUsername] = useState(null);
    
    return (
        <Typography>
            {'Please Enter your name'}
        </Typography>
    )
};

export default UserName;