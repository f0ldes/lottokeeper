import { useContext, useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import Context from "../../context/userContext";

const UserName = () => {
    const { isAdmin, userData, updateUsername } = useContext(Context);
    const [username, setUsername] = useState('');

    if (isAdmin) {
        return <Typography> Udvozlunk, Uzemeleteto. </Typography>
    };

    if (!isAdmin && userData && userData.name !== 'unknown') {
        return <Typography> Hey, {userData.name}! </Typography>;
    };
    
    const handlUsernameChange = (event) => {
        setUsername(event.target.value)
    };

    const registerNewName = () => {
        updateUsername(username)
    };

    return (
        <Box>
            <TextField
                label="Enter your name"
                value={username}
                onChange={handlUsernameChange}
            />
            <Button onClick={registerNewName}>Register</Button>
        </Box>
    )
};

export default UserName;