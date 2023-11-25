import { Button, Box } from '@mui/material';
import { useContext } from 'react';
import { resetGameData } from '../../../utils/fetch/resetGame';
import Context from '../../context/userContext';

const DrawGameComponent = () => {
    const { handleDraw, winData, setWinData } = useContext(Context);

    const handleReset = async () => {
        if (winData && winData.previousGameId) {
            await resetGameData(winData.previousGameId);
            setWinData(null); /* reset the win data in the local storage too. */
        } else {
            console.log('No winData avaiable, or the game is still actve.')
        }
    };

    return (
        <Box>
            <Button onClick={ winData ? handleReset : handleDraw}>
                {winData ? 'New Game' : 'Draw Game'}
            </Button>
        </Box>
    )
};

export default DrawGameComponent;