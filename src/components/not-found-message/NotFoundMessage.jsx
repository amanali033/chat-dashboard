import { Box, Typography } from "@mui/material";
import { MoodBad } from "@mui/icons-material";

const NotFoundMessage = ({ message = "No data found" }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      color="#666"
    >
      <MoodBad fontSize="large" sx={{ mb: 1, color: "#579aff" }} />
      <Typography variant="body1" color="#6F7780">
        {message}
      </Typography>
      {/* <Typography variant="body2" color="textSecondary">
        Try adding a new contact or refreshing the list.
      </Typography> */}
    </Box>
  );
};

export default NotFoundMessage;
