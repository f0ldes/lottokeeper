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
                <Typography variant="subtitle1"> Megjegyzések </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: theme.palette.background.default }} >
                <Typography>
                    Something
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
};

export default NotesElement;