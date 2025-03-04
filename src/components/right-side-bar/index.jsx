import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function RightSidebar() {
  return (
    <Box
      sx={{
        // position: "fixed",
        // right: 0,
        // top: "50%",

        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
        gap: 1,
        // height: "calc(100vh - 0px)", // Adjust drawer height
        // marginTop: "64px",
        borderLeft: "1px solid #DDE1E5",
      }}
    >
      <IconButton
        sx={{
          bgcolor: "primary.main", // Set background color to blue
          borderRadius: "4px", // Set border radius
          color: "white", // Set icon color to white
          "&:hover": {
            bgcolor: "darkblue", // Darker blue on hover
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
}
