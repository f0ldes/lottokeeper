import React from "react";
import theme from "./theme/theme";
import MainRoutes from "./main/Main";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MainRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
