import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Toaster
        position="center"
        toastOptions={{
          className: "",
          style: {
            color: "#7a7a71",
            fontWeight: "500",
          },
        }}
      />
      <App />
    </ThemeProvider>
  </StrictMode>
);
