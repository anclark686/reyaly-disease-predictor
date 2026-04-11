import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import PredictorPage from "./pages/PredictorPage";
import VisualizationsPage from "./pages/VisualizationsPage";

import "./index.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3FC0DF",
      light: "#5CE1E6",
      dark: "#2a7b9bda",
    },
  },
  typography: {
    fontFamily: '"Mulish", sans-serif',
  },
});

export function App() {
  const [page, setPage] = useState<
    "home" | "about" | "predictor" | "visualizations"
  >("home");

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="app">
          <Navbar page={page} setPage={setPage} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/predictor" element={<PredictorPage />} />
              <Route path="/visualizations" element={<VisualizationsPage />} />
            </Routes>
          </div>
          <div className="footer">
            <p>© 2026 Reyaly Technology Company. All rights reserved.</p>
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
