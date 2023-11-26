import UserName from './elements/Username/UserName';
import Balance from './elements/Balance/Balance';
import ListElement from './elements/List/List';
import CreateTicket from './elements/CreateTicket/CreateTicket';
import Context from './context/userContext';
import SummaryElement from './elements/Summary/Summary';
import DrawGameComponent from './elements/DrawGame/DrawGame';
import { Link } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';
import { useContext } from 'react';

const InfoPanel = () => {
    return (
        <Box deisplay="flex"  justifyContent="center" alignItems="center" flexDirection="column" >
            <UserName/>
            <Balance />
            <CreateTicket /> 
        </Box>
    )
};

/* main panel: */
const UserPanel = () => {
    const { isAdmin, winData } = useContext(Context)
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight='100vh' flexDirection='column' >
            <Grid container justifyContent="center" alignItems="center" sx={{ border: 1, borderColor: 'secondary.main' }}>
                <Grid item sx={{ border: 1, borderColor: 'secondary.main' }}>
                    <InfoPanel />
                </Grid>
                <Grid item sx={{ border: 1, borderColor: 'secondary.main' }}>
                    <ListElement />
                </Grid>
            </Grid>
            {isAdmin && <DrawGameComponent />}
            {winData && <SummaryElement />}
            <Button component={Link} to='/' > Vissza </Button>
        </Box>
    )
};

export default UserPanel;