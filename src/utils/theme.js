import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#146ef5",
    },
    text: {
      primary: "#202328",
    },
  },
  typography: {
    fontFamily: "DM Sans, sans-serif",
    //  fontFamily: '"Open Sans", serif',
    body1: {
      color: "#202328",
    },
    body2: {
      color: "#202328",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Rounded buttons for a softer UI
          boxShadow: "none", // Removes unwanted shadows
          "&:hover": {
            boxShadow: "none", // No shadow on hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px", // Softer edges for modals/cards
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)", // Subtle shadow for elevation
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px", // Input fields with rounded edges
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#146ef5",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#146ef5",
            },
          },
        },
      },
    },
  },
});

export default theme;
