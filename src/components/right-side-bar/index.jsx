import { useState } from "react";
import { Box, IconButton, Popover, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function RightSidebar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "new-contact-popover" : undefined;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
        gap: 1,
        marginTop: "64px",
        borderTop: "1px solid #DDE1E5",
      }}
    >
      <IconButton
        sx={{
          bgcolor: "primary.main",
          borderRadius: "4px",
          color: "white",
          "&:hover": {
            bgcolor: "darkblue",
          },
        }}
        onClick={handleClick}
      >
        <AddIcon />
      </IconButton>

      {/* Popover for New Contact */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="h6">New Contact</Typography>
          <Typography variant="body2" color="textSecondary">
            Add a new contact to your list.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleClose}
          >
            Add Contact
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
