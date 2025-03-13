import { useState } from "react";
import { Box, IconButton, Popover, Typography, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function RightSidebar({ menuItems = [] }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "menu-popover" : undefined;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 0.75,
        px: 0.75,
        gap: 1,
        borderLeft: "1px solid #DDE1E5",
        minWidth: "45.35px",
        height: "100vh",
        overflow: "hidden",
        "@media (max-width:600px)": {
          width: "50px",
          height: "50px",
          position: "fixed",
          right: "10px",
          bottom: "10px",
          borderLeft: "0px",
        },
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

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: "4px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "160px",
            py: 1,
          },
        }}
      >
        <div>
          {menuItems.length > 0 ? (
            menuItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  handleClose();
                  item.onClick && item.onClick();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 24px",
                }}
              >
                <Typography variant="body1">{item.label}</Typography>
              </MenuItem>
            ))
          ) : (
            <Typography variant="body2" sx={{ p: 2, textAlign: "center" }}>
              No menu items available
            </Typography>
          )}
        </div>
      </Popover>
    </Box>
  );
}
