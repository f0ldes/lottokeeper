import UserName from './elements/UserName/UserName';
import Balance from './elements/Balance/Balance';
import ListElement from './elements/List/List';
import CreateTicket from './elements/CreateTicket/CreateTicket';
import { Link } from 'react-router-dom';
import { Box, Grid, Button } from '@mui/material';

const InfoPanel = () => {
    return (
        <Box deisplay="flex"  justifyContent="center" alignItems="center" flexDirection="column">
            <UserName/>
            <Balance />
            <CreateTicket />
        </Box>
    )
};

/* main panel: */
const UserPanel = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight='100vh' flexDirection='column'>
            <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                    <InfoPanel />
                </Grid>
                <Grid item>
                    <ListElement />
                </Grid>
            </Grid>
            <Button component={Link} to='/' > Vissza </Button>
        </Box>
    )
};

export default UserPanel;