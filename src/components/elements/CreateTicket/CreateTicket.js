import { Box, Typography, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/userContext";
import { saveTickets } from "../../../utils/fetch/saveTickets";

const CreateTicket = () => {
    const { userData, updateTicketList, handleUserBalance, gameData } = useContext(Context);
    const [userNumbers, setUserNumbers] = useState([]);
    
    //esetleg ezt is ki lehet szervezni:
    const handleNumberChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^[0-9]+$/.test(value)) {
            setUserNumbers(value);
        };
    };

    const playNumbers = async () => {
        /* userData id check mas a contextbe, legyen ugyanaz a stilo... */
        await saveTickets(userData, gameData.id, userNumbers );
        setUserNumbers('numbers are registered for the game!')
        updateTicketList();
        handleUserBalance();
    };

    return (
        <Box flexDirection='column'>
            <Typography> Szamaim:  {userNumbers} </Typography>
            <TextField value={userNumbers === 'numbers are registered for the game!' ? '' : userNumbers} onChange={handleNumberChange} variant='standard' inputProps={{ maxLength: 5 }}  />
            <Button fullWidth onClick={playNumbers} > Megjatszom </Button>
        </Box>
    );
};

export default CreateTicket;