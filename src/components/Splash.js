import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./context/userContext";
import NotesElement from "./elements/Notes/Notes";


const TextPanel = () => (
    <Typography variant="h1" align="center" gutterBottom>
        Lottokeeper.
    </Typography>
);

const ButtonPanel = () => {
    const { setIsAdmin } = useContext(Context);
    const navigate = useNavigate();

    const handleAdminRole = () => {
        setIsAdmin(true);
        navigate('/user');
   };

    const handleUserRole = () => {
        setIsAdmin(false);
        navigate('/user');
    };

    return (
        <Box width='100%' display="flex" justifyContent="center" alignItems="center" sx={{padding: 1}}>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} sm={6}>
                    <Button onClick={handleUserRole} variant="contained" fullWidth> Player </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button onClick={handleAdminRole} variant="contained" fullWidth> Operator </Button>
                </Grid>
            </Grid>
        </Box>
    )
};

const SplashPage = () => {
    return (
        <Box display="flex" justifyContent="center" justifyItems="center" alignItems="center" minHeight="100%" flexDirection="column" >
            <Box display="flex" justifyContent="center" sx={{marginY: '15%', height: '100%', width: '100%'}} >
                <Grid container display="flex" justifyItems="center" flexDirection='column' sx={{ width: '40%', padding: 1, height: '100%' }} >
                    <Grid item sx={{ paddingBottom: 3 }} >
                        <TextPanel />
                    </Grid>
                    <Grid item >
                        <ButtonPanel />
                    </Grid>
                    <Grid item >
                        <NotesElement />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default SplashPage;