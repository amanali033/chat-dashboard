import React from "react";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// Component to render the back button
const BackButton = () => {
  const navigate = useNavigate();

  // Handle the back navigation
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <IconButton
      color="primary.main"
      onClick={handleBack}
      sx={{
        position: "absolute",
        top: 8,
        left: 8,
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: "primary.main", // Light grey background
        borderRadius: "4px",
        "&:hover": {
          backgroundColor: "#5094f8", 
          color: "primary.main", 
        },
      }}
    >
      <ChevronLeftIcon color="#fff" sx={{ fontSize: "20px", color: "#fff" }} />
    </IconButton>
  );
};

export default BackButton;
