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
            <Box sx={{ width: '100%', textAlign: 'left', padding: 2}}> 
                <Typography varian="h5"> Welcome,  Operator! </Typography>
            </Box>
        );
    }

    /* The default name of all non admin type users is 'unknown' */
    if (!isAdmin && userData?.name && userData?.name !== 'unknown') {
        return (
            <Box sx={{ borderColor: 'default', padding: 2 }}  flexDirection="column" display='flex' justifyContent='center' alignItems='flex-start'>
                <Typography variant="h5" >Hey, {userData.name}!</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ borderColor: 'default', padding: 2 }} flexDirection="column" display='flex' justifyContent='space-between' alignItems='center'>
            <Box sx={{ width: '100%', textAlign: 'left' }}> 
                <Typography varian="h6"> Welcome Player! </Typography>
            </Box>

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
