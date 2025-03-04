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
});

export default theme;
