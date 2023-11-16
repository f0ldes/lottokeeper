import { useState } from 'react';
import {Box, Grid, Typography, List, ListItem, ListItemText, Button } from '@mui/material';


/* info panel elements for user: */
const UserName = () => {
    return (
        <Typography>
            UserName
        </Typography>
    )
};

const Balance = () => {
    const [balance, setBalance] = useState('6000 Ache')
    return (
        <Typography>
            This is the balance: {balance}
        </Typography>
    )
};

const CreateTicket = () => {
    return (
        <Box flexDirection='column'>
            <Typography> 1, 2, 3, 4, 5 </Typography>
            <Button> Megjatszom </Button>
        </Box>
    )
};

const InfoPanel = () => {
    return (
        <Box deisplay="flex"  justifyContent="center" alignItems="center" flexDirection="column">
            <UserName/>
            <Balance />
            <CreateTicket />
        </Box>
    )
};
/* list element for user: */
const ListElement = () => {
    const [listElemenets, setListElements] = useState(['first', 'second', 'third', 'fourth'])
    return (
        <List dense={true}>
            {listElemenets.map((element, index) => (
                <ListItem key={index}>
                    <ListItemText primary={element} />
                </ListItem>
            ))}
        </List>
    )
};

/* main panel: */
const PlayerPanel = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight='100vh'>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <InfoPanel />
                </Grid>
                <Grid item>
                    <ListElement />
                </Grid>
            </Grid>
        </Box>
    )
};

export default PlayerPanel;