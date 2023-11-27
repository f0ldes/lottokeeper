import { TextField, Button, Grid, Box, Typography } from "@mui/material";

const CreateFakeTickets = ({numbersArray, setNumbersArray, counter, setCounter}) => {

    const handleInputChange = (event) => {
        setCounter(event.target.value);
    };

    const generateArrayOfNumbers = () => {
        let howManySets = parseInt(counter);

        const newGeneratedNumbers = Array.from({ length: howManySets }, () =>
            Array.from({ length: 5 }, () => Math.floor(Math.random() * 39) + 1).map(String)
        );
        setNumbersArray(newGeneratedNumbers);
    };

    return (
        <Box sx={{ my: 2 }}>
            <Grid container alignItems="center" justifyContent="space-between" sx={{padding: 1}}>
                <Grid item>
                    <Typography>
                        Number of tickets to generate:
                    </Typography>
                </Grid>
                <Grid item>
                    <TextField
                        value={counter}
                        onChange={handleInputChange}
                        variant='outlined'
                        size="small"
                        sx={{
                            width: '50px',
                            '& input': {
                                textAlign: 'center'
                            }
                        }}
                    />
                </Grid>
            </Grid>
            <Button fullWidth variant='outlined' onClick={generateArrayOfNumbers}>
                Generate Numbers
            </Button>
            <Box mt={2}>
                {numbersArray && numbersArray.map((array, index) => (
                    <Typography key={index}>{array.join(', ')}</Typography>
                ))}
            </Box>
        </Box>
    )
};

export default CreateFakeTickets;