import { Box, Button, TextField, Grid, Alert, Container } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import Context from "../../context/userContext";
import { saveTickets } from "../../../utils/fetch/saveTickets";
import CreateFakeTickets from "./CreateFakeTickets/CraeteFakeTickets";
import { updateGameData } from "../../../utils/fetch/updateGameData";
import { areNumbersValid } from "../../../utils/handlers/listHandlers";

/* Custom component to receive the correct number inputs: */
const CustomInputField = ({ onChange, setSuccessMessage, clearFields }) => {
    const [numbers, setNumbers] = useState(new Array(5).fill(''));
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (clearFields) {
            setNumbers(new Array(5).fill(''));
        }
    }, [clearFields]);

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
    
    const HandleOnHover = () => {
        setSuccessMessage(false);
    }

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
                            value={num}
                            onMouseEnter={HandleOnHover}
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
    const [alertMessage, setAlertMessage] = useState('');
    const [clearFields, setClearFields] = useState(0); // To trigger when to clear th input fields. 



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
            if (areNumbersValid(userNumbers) && userData.balance > 0) { //check for user balance
                await saveTickets(userData, gameData.id, userNumbers);
                setSuccessMessage(true);
                setUserNumbers(''); // Clear the input field
                setClearFields(prev => prev + 1); //clear the filed in the custom componenet. (not counting anything)
                updateTicketList();
                handleUserBalance();
                setAlertMessage('');
            } else {
                setSuccessMessage(false)
                setAlertMessage( userData?.balance <= 0 ? 'Insufficient Balance' : 'Check your numbers! Min. 5 and unique!')
            }
        }
    };

    return (
        <Box flexDirection='column' sx={{ padding: 1 }}>
            {
                isAdmin ?
                    <>
                        {!winData &&

                            <Box sx={{padding: 1}}>
                                <CreateFakeTickets counter={counter} setCounter={setCounter} numbersArray={numbersArray} setNumbersArray={setNumbersArray} />
                                {numbersArray.length > 0 && <Button fullWidth onClick={playNumbers} variant="contained" > Megjatszom </Button>}
                            </Box>


                        }
                    </>
                    :
                    <>
                        {!winData &&
                            <Container sx={{ padding: 1 }}>
                                <CustomInputField onChange={(newNumbers) => setUserNumbers(newNumbers)} setSuccessMessage={setSuccessMessage} clearFields={clearFields} />
                            </Container>
                        }
                        <Grid container flexDirection="column">
                            <Grid item sx={{ padding: 1 }}>
                                {alertMessage !== '' && <Alert severity="error"> {`${alertMessage}`} </Alert>}
                                {successMessage && <Alert severity='success'> {`Numbers are registered for the game!`} </Alert>}
                            </Grid>
                            <Grid item sx={{ padding: 1 }}>
                                {!winData && <Button fullWidth onClick={playNumbers} variant="contained"> Megjatszom </Button>}
                            </Grid>
                        </Grid>
                    </>
            }
        </Box>
    );
};

export default CreateTicket;