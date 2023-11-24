import { Button, Box } from '@mui/material';
import { useContext } from 'react';
import Context from '../../context/userContext';

const DrawGameComponent = () => {
    const { handleDraw } = useContext(Context);
    return (
        <Box>
            <Button
                onClick={handleDraw}
            >
                Draw Game
            </Button>
        </Box>
    )
};

export default DrawGameComponent