import { useContext, useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import Context from "../../context/userContext";

const UserName = () => {
    const { isAdmin, userData, updateUsername } = useContext(Context);
    const [username, setUsername] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const registerNewName = () => {
        updateUsername(username);
    };

    /* Conditionally render the username / welcome message for admin: */
    if (isAdmin) {
        return (
            <Box sx={{ borderColor: 'default', padding: 1 }} flexDirection="column" display='flex' justifyContent='center' alignItems='center'>
                <Typography> Udvozlunk, Uzemeleteto! </Typography>
            </Box>
        );
    }

    /* The default name of all non admin type users is 'unknown' */
    if (!isAdmin && userData?.name && userData?.name !== 'unknown') {
        return (
            <Box sx={{ borderColor: 'default', padding: 1 }} flexDirection="column" display='flex' justifyContent='center' alignItems='center'>
                <Typography>Hey, {userData.name}!</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ borderColor: 'default', padding: 1 }} flexDirection="column" display='flex' justifyContent='center' alignItems='center'>
            <Typography> Welcome Player! </Typography>

                <TextField
                    fullWidth
                    variant='standard'
                    label=""
                    placeholder="Enter your new username here."
                    value={username}
                    onChange={handleUsernameChange}
                    sx={{ marginBottom: 1 }}
                />
            <Button fullWidth onClick={registerNewName} variant="outlined">Register Username </Button>
        </Box>
    );
};

export default UserName;
