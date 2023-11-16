import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        }, 
        background: {
            default: '#0B090A',
        },
        text: {
            primary: '#FFFDF7'
        }
    }, 
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        h1: {
          fontSize: '2.5rem',
        },
    }    
});

export default theme;