import { Box, Button, TextField, Grid, Alert, Container } from "@mui/material";
import { useContext, useState } from "react";
import Context from "../../context/userContext";
import { getUserData } from "../../../utils/fetch/fetchUser"
import { saveTickets } from "../../../utils/fetch/saveTickets";
import CreateFakeTickets from "./CreateFakeTickets/CraeteFakeTickets";
import { updateGameData } from "../../../utils/fetch/updateGameData";

/* Custom component to receive the correct number inputs: */
const CustomInputField = ({ onChange }) => {
    const [numbers, setNumbers] = useState(new Array(5).fill(''));
    const [showAlert, setShowAlert] = useState(false);

    const handleBlur = (index) => (event) => {
        /* checks the input value if it's within the correct range, upon moving from the input field: */
        let newNumbers = [...numbers];
        const value = event.target.value;
        const numberValue = parseInt(value, 10);
    
        if (!value || (numberValue >= 1 && numberValue <= 39)) {
            newNumbers[index] = value;
            setShowAlert(false);
        } else {
            newNumbers[index] = '';
            setShowAlert(true);
        }
        setNumbers(newNumbers);
        onChange(newNumbers);
    };
    

    const handleChange = (index) => (event) => {
        let newNumbers = [...numbers];
        const value = event.target.value;
    
        if (value === '' || value.match(/^\d{1,2}$/)) {
            newNumbers[index] = value;
            setNumbers(newNumbers);
            onChange(newNumbers);
        }
    };
    
    return (
        <Box sx={{ width: 'auto', maxWidth: '100%', margin: '0 auto', padding: 1, borderColor: 'default', border: 1}}>
            <Grid container spacing={1} justifyContent="center" alignItems="center">
                {numbers.map((num, index) => (
                    <Grid item key={index} sx={{ width: 'fit-content'}}>
                        <TextField 
                            onChange={handleChange(index)}
                            onBlur={handleBlur(index)}
                            inputProps={{ maxLength: 2 }} 
                            sx={{
                                width: '60px',
                                '& input': {
                                    textAlign: 'center'
                                }
                            }}
                            variant='standard'
                        />
                    </Grid>
                ))}
            </Grid>
            {showAlert && <Alert severity='error' sx={{margin: 1}}> Lotto numbers must be within 1 to 39. </Alert>}
        </Box>
    );
};

const CreateTicket = () => {
    const { userData, getUser, updateTicketList, handleUserBalance, gameData, isAdmin, currentGame, winData, setAllTicketFlag } = useContext(Context);
    /* array of numbers:  */
    const [numbersArray, setNumbersArray] = useState([]);
    const [counter, setCounter] = useState('');
    /* containing single winning numbers: */
    const [userNumbers, setUserNumbers] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const playNumbers = async () => {
        if (isAdmin && gameData) {
            /* if the admin user is calling the handler, it triggers it with the extra counter argumnet: */
            await saveTickets(userData, gameData.id, numbersArray, counter);
            await currentGame.incrementTicketsSold(counter)
            await updateGameData(currentGame) //increment the mount of tickets sold.
            updateTicketList();
            setAllTicketFlag(prevFlag => !prevFlag); //this flags the useEffect in the ticket list componenet to update.
            setNumbersArray('');
            setCounter('');
            await getUser(isAdmin); //update the admin balance
        } else if (!isAdmin && gameData) {
            await saveTickets(userData, gameData.id, userNumbers);
            setSuccessMessage(true);
            setUserNumbers(''); // Clear the input field
            updateTicketList();
            handleUserBalance();
        }
    };

    return (
        <Box flexDirection='column' sx={{ borderColor: 'default', padding: 1 }}>
            {
                isAdmin ?
                    <>
                        {!winData &&
                            <>
                                <CreateFakeTickets counter={counter} setCounter={setCounter} numbersArray={numbersArray} setNumbersArray={setNumbersArray} />
                                {numbersArray.length > 0 && <Button fullWidth onClick={playNumbers} variant="outlined" > Megjatszom </Button>}
                            </>

                        }
                    </>
                    :
                    <>
                        {!winData &&
                            <Container sx={{ padding: 1 }}>
                                <CustomInputField onChange={(newNumbers) => setUserNumbers(newNumbers)} />
                            </Container>
                        }
                        {userNumbers && successMessage &&
                            <Container sx={{ padding: 1 }}>
                                <Alert severity='success'> {`${userNumbers} are registered for the game!`} </Alert>
                            </Container>
                        }
                        {!winData && <Button fullWidth onClick={playNumbers} variant='outlined'> Megjatszom </Button>}
                    </>
            }
        </Box>
    );
};

export default CreateTicket;