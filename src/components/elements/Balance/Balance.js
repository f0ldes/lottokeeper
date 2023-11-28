import React, { useContext } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { AnimatedCounter } from 'react-animated-counter';
import Context from '../../context/userContext';

const Balance = () => {
    const { userData } = useContext(Context);
    const balance = userData ? userData.balance : 0;


    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            sx={{ borderColor: 'default', padding: 2 }}
        >
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}> {/* Add spacing between items */}
            <Grid item>
                <Typography variant="h5"> Your available balance: </Typography>
            </Grid>
            <Grid item>
                <Box sx={{ borderBottom: 1, borderColor: 'default', padding: 1 }}>
                    {userData ? (
                        <AnimatedCounter 
                            value={balance} 
                            fontSize="20px" 
                            color="white"
                            decimalPrecision='0'
                        />
                    ) : (
                        <Typography> No balance available. </Typography>
                    )}
                </Box>
            </Grid>
        </Grid>
        </Box>
    );
};

export default Balance;
