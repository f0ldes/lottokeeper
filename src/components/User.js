import UserName from './elements/Username/UserNameComponent';
import Balance from './elements/Balance/Balance';
import ListElement from './elements/List/List';
import CreateTicket from './elements/CreateTicket/CreateTicket';
import Context from './context/userContext';
import SummaryElement from './elements/Summary/Summary';
import DrawGameComponent from './elements/DrawGame/DrawGame';
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import { scrollbarStyle } from '../theme/theme';
import { Box, Grid, Button, Typography, GlobalStyles } from '@mui/material';
import { useContext } from 'react';

const InfoPanel = () => {
    return (
        <Box deisplay="flex"  justifyContent="center" alignItems="center" flexDirection="column" sx={{border: 1}} >
            <UserName/>
            <Balance />
            {/* <CreateTicket /> */}
        </Box>
    )
};

/* main panel: */
const UserPanel = () => {
    const { isAdmin, winData } = useContext(Context)
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
            >
                <Box sx={{ height: '100vh', width: '100%' }} display="flex" justifyContent="center" flexDirection="column" alignItems="center" >
                    <GlobalStyles styles={scrollbarStyle} />
                    <Box sx={{ width: '500px' }} >
                        <Grid container justifyContent="center" alignItems="flex-start" display="flex" flexDirection="column" >
                            <Grid item sx={{ width: '500px', minHeight: '300px' }}>
                                <InfoPanel />
                                {isAdmin &&
                                    <Box sx={{ padding: 1 }}>
                                        <DrawGameComponent />
                                    </Box>
                                }
                                <Box sx={{ padding: 2 }}>
                                    <Button fullWidth component={Link} to='/role' variant="contained" > Back </Button>
                                </Box>
                            </Grid>
                            {/* <Grid item sx={{ width: '500px', minHeight: '300px' }}>
                                <Box sx={{ ml: 2 }}>
                                    {!winData && <Typography variant='h5'> Tickets List: </Typography>}
                                </Box>
                                <ListElement />
                            </Grid> */}
                        </Grid>
                    </Box>
                </Box>
            </motion.div>
            {/* <Box display="flex" justifyContent="center" alignItems="center" minHeight='100vh' flexDirection='column' >
                <GlobalStyles styles={scrollbarStyle} />
                <Grid container justifyContent="center" alignItems="flex-start" >
                    <Grid item sx={{ width: '500px', minHeight: '300px' }}>
                        <InfoPanel />
                        {isAdmin &&
                            <Box sx={{ padding: 1 }}>
                                <DrawGameComponent />
                            </Box>
                        }
                        <Box sx={{ padding: 2 }}>
                            <Button fullWidth component={Link} to='/role' variant="contained" > Back </Button>
                        </Box>
                    </Grid>
                    <Grid item sx={{ width: '500px', minHeight: '300px' }}>
                        <Box sx={{ ml: 2 }}>
                            {!winData && <Typography variant='h5'> Tickets List: </Typography>}
                        </Box>
                        <ListElement />
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item sx={{ width: '1000px' }}>
                        {winData && <SummaryElement />}
                    </Grid>
                </Grid>
            </Box> */}
        </>
    )
};

const InfoPanelOld = () => {
    return (
        <Box deisplay="flex"  justifyContent="center" alignItems="center" flexDirection="column" >
            <UserName/>
            <Balance />
            <CreateTicket /> 
        </Box>
    )
};

const UserPanelOld = () => {
    const { isAdmin, winData } = useContext(Context)
    return (

        <Box display="flex" justifyContent="center" alignItems="center" minHeight='100vh' flexDirection='column' >
            <GlobalStyles styles={scrollbarStyle} />
            <Grid container justifyContent="center" alignItems="flex-start" >
                <Grid item sx={{ width: '500px', minHeight: '300px' }}>
                    <InfoPanel />
                    {isAdmin &&
                        <Box sx={{ padding: 1 }}>
                            <DrawGameComponent />
                        </Box>
                    }
                    <Box sx={{ padding: 2 }}>
                        <Button fullWidth component={Link} to='/role' variant="contained" > Back </Button>
                    </Box>
                </Grid>
                <Grid item sx={{ width: '500px', minHeight: '300px' }}>
                    <Box sx={{ ml: 2}}>
                        {!winData && <Typography variant='h5'> Tickets List: </Typography>}
                    </Box>
                    <ListElement />
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item sx={{width: '1000px'}}>
                    {winData && <SummaryElement />}
                </Grid>
            </Grid>
        </Box>
    )
};

export default UserPanel;