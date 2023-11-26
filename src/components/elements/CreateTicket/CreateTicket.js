import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/userContext";
import { saveTickets } from "../../../utils/fetch/saveTickets";
import CreateFakeTickets from "./CreateFakeTickets/CraeteFakeTickets";
import { updateGameData } from "../../../utils/fetch/updateGameData";

/* Custom component to receive the correct number inputs: */
const CustomInputField = ({ onChange }) => {
    const [numbers, setNumbers] = useState(new Array(5).fill(''));

    const handleChange = (index) => (event) => {
        let newNumbers = [...numbers];
        const value = event.target.value;

        if (value.match(/^\d{0,2}$/)) {
            const numberValue = parseInt(value);
            /* check the number if its between 1 - 39: */
            if (numberValue >= 1 && numberValue <= 39 || value === '') {
                newNumbers[index] = value;
            }
            setNumbers(newNumbers);
            onChange(newNumbers);
        };
    };    
    
    return (
        <Box sx={{ width: 'auto', maxWidth: '100%', margin: '0 auto' }}>
            <Grid container spacing={1}>
                {numbers.map((num, index) => (
                    <Grid item key={index} sx={{ width: 'fit-content' }}>
                        <TextField 
                            onChange={handleChange(index)}
                            inputProps={{ maxLength: 2 }} 
                            sx={{width: '60px'}}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const CreateTicket = () => {
    const { userData, updateTicketList, handleUserBalance, gameData, isAdmin, currentGame } = useContext(Context);
    /* array of numbers:  */
    const [numbersArray, setNumbersArray] = useState([]);
    const [counter, setCounter] = useState('');
    /* containing single winning numbers: */
    const [userNumbers, setUserNumbers] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const playNumbers = async () => {
        if (isAdmin) {
            /* if the admin user is calling the handler, it triggers it with the extra counter argumnet: */
            await saveTickets(userData, gameData.id, numbersArray, counter);
            await currentGame.incrementTicketsSold(counter)
            await updateGameData(currentGame) //increment the mount of tickets sold
            console.log(numbersArray, counter, isAdmin, currentGame);
            updateTicketList();
            setNumbersArray('');
            setCounter('');
        } else {
            await saveTickets(userData, gameData.id, userNumbers);
            setSuccessMessage('Numbers are registered for the game!');
            setUserNumbers(''); // Clear the input field
            updateTicketList();
            handleUserBalance();
        }
    };

    return (
        <Box flexDirection='column'>
            {
                isAdmin ?
                    <>
                        <CreateFakeTickets counter={counter} setCounter={setCounter} numbersArray={numbersArray} setNumbersArray={setNumbersArray} />
                        {numbersArray.length > 0 && <Button fullWidth onClick={playNumbers} > Megjatszom </Button>}
                    </>
                    :
                    <>
                        <Typography> Szamaim: {userNumbers} </Typography>
                        <Typography color="green">{successMessage}</Typography>
   {   /*                  <TextField value={userNumbers} onChange={handleNumberChange} variant='standard' inputProps={{ maxLength: 5 }} /> */}
                        <CustomInputField onChange={(newNumbers) => setUserNumbers(newNumbers)} />
                        <Button fullWidth onClick={playNumbers} > Megjatszom </Button>
                    </>
            }
        </Box>
    );
};

export default CreateTicket;