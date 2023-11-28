import { TextField, Button, Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper  } from "@mui/material";

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
        <Box >
            <Grid container alignItems="center" justifyContent="space-between" >
                <Grid item sx={{ mb: 1 }}>
                    <Typography variant="h6" >
                        Number of tickets to generate:
                    </Typography>
                </Grid>
                <Grid item sx={{ mb: 1 }}>
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
            <Button fullWidth variant='contained' onClick={generateArrayOfNumbers}>
                Generate Numbers
            </Button>
            <Box mt={2}>
                <TableContainer component={Paper} mt={2} sx={{ backgroundColor: 'transparent' }}>
                    <Table aria-label="simple table" size="small"> 
                        <TableBody>
                            {numbersArray && numbersArray.map((array, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" style={{ borderBottom: 'none' }}>
                                        {index + 1} 
                                    </TableCell>
                                    <TableCell align="right" style={{ borderBottom: 'none' }}>
                                        {array.join(', ')} 
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
};

export default CreateFakeTickets;