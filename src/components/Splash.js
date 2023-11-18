import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "./context/userContext";


const TextPanel = () => (
    <Typography variant="h1" align="center" gutterBottom>
        Welcome to Lottokeeper!
        {/* meg ide a johet az elozo nyeroszamok */}
    </Typography>
);

//ezt ki lehet esetleg szervezni;
const ButtonPanel = () => {
    const { isAdmin, setIsAdmin } = useContext(Context);
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
        <Box width='100%' display="flex" justifyContent="center" alignItems="center" gap={2}>
            <Button onClick={handleUserRole} > Jatekos Vagyok </Button>
            <Button onClick={handleAdminRole} > Uzemeleteto Vagyok </Button>
        </Box>
    )
};

const SplashPage = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column" >
            <TextPanel />
            <ButtonPanel />
        </Box>
    );
};

export default SplashPage;