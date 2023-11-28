import { Button, Box } from '@mui/material';
import { useContext } from 'react';
import { resetGameData } from '../../../utils/fetch/resetGame';
import Context from '../../context/userContext';

const DrawGameComponent = () => {
    const { handleDraw, winData, setWinData, getGame } = useContext(Context);

    const handleReset = async () => {
        /* handle reset: trigger function to update the games db. */
        if (winData && winData.previousGameId) {
            await resetGameData(winData.previousGameId); //reset the win data in ls.
            localStorage.removeItem('lastDisplayedList'); //clear the local storage, if we have a new game.
            setWinData(null); //reset the win Data in ls.
            await getGame(); //reset also the gamedata.

        } else {
            console.log('No winData avaiable, or the game is still actve.')
        }
    };

    return (
        <Box sx={{padding: 1}}>
            <Button variant='contained' fullWidth onClick={ winData ? handleReset : handleDraw}>
                {winData ? 'New Game' : 'Draw Game'}
            </Button>
        </Box>
    )
};

export default DrawGameComponent;