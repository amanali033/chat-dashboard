import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        py: 10,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h1" color="primary" fontWeight={700} gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.primary" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        It might have been moved or deleted. Please check the URL or return to
        the homepage.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          boxShadow: "none",
          borderRadius: "12px",
          textTransform: "capitalize",
        }}
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
