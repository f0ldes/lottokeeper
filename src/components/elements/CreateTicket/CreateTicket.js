import { Box, Typography, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/userContext";
import { saveTickets } from "../../../functions/fetch/saveTickets";

const CreateTicket = () => {
    const { userData } = useContext(Context);
    const [userNumbers, setUserNumbers] = useState([]);
    
    //esetleg ezt is ki lehet szervezni:
    const handleNumberChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^[0-9]+$/.test(value)) {
            setUserNumbers(value);
        };
    };

    const playNumbers = () => {
        saveTickets(userData?.id, 1, userNumbers );
        setUserNumbers('numbers are registered for the game!')
    };

    return (
        <Box flexDirection='column'>
            <Typography> Szamain:  {userNumbers} </Typography>
            <TextField value={userNumbers === 'numbers are registered for the game!' ? '' : userNumbers} onChange={handleNumberChange} variant='standard' inputProps={{ maxLength: 5 }}  />
            <Button fullWidth onClick={playNumbers} > Megjatszom </Button>
        </Box>
    )
};

export default CreateTicket;