import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#F6F4F1',
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
        secondaryFontFamily: '"Canela"',
        fontSize: 14,
        h1: {
          fontSize: '7rem',
          '@media (max-width:600px)': { 
            fontSize: '1.5rem',
          },
          '@media (max-width:960px)': { 
            fontSize: '2rem',
          },
          fontFamily: '"Canela", "Roboto", "Helvetica", "Arial", sans-serif'
        },

    }    
});

const scrollbarStyle = {
    '*::-webkit-scrollbar': {
        width: '0px',
    },
    '*::-webkit-scrollbar-track': {
        background: '#f1f1f1',
    },
    '*::-webkit-scrollbar-thumb': {
        background: '#888',
    },
    '*::-webkit-scrollbar-thumb:hover': {
        background: '#555',
    },
}

export {
    theme, 
    scrollbarStyle
}