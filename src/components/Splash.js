import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const TextPanel = () => {
    return (
        <Typography variant="h1" align="center" gutterBottom>
            Welcome to Lottokeeper!
            {/* meg ide a johet az elozo nyeroszamok */}
        </Typography>
    )
};

const ButtonPanel = () => (
    <Box width='100%' display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button component={Link} to='/player' > Test Button 1</Button>
        <Button> Test Button 2</Button>
    </Box>
);

const SplashPage = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column" >
            <TextPanel />
            <ButtonPanel />
        </Box>
    );
};

export default SplashPage;