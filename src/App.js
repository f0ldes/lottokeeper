import React from "react";
import theme from "./theme/theme";
import MainRoutes from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <MainRoutes />
        </Router>
    </ThemeProvider>
  );
};

export default App;
