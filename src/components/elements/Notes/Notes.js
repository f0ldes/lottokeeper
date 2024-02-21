import { useTheme } from "@emotion/react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"




const NotesElement = () => {
    const theme = useTheme();
    return (
        <Accordion >
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{color: '#F6F4F1'}} />} 
                style={{ backgroundColor: theme.palette.background.default }}
            >
                <Typography variant="subtitle1"> How to play </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: theme.palette.background.default }} >
                <Typography variant='subtitle2' > <strong> 1. first title - for  </strong> </Typography>
                <Typography variant='body2'> 
                    Here should be a little summary, on how the game is played. 
                </Typography>
                <Typography variant='subtitle2' > <strong> 2. second title - for  </strong> </Typography>
                <Typography variant='body2'> 
                    Here should be a little summary, on how the game is played. Ellaborating on this little summary. 
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
};

export default NotesElement;