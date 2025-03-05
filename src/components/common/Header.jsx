import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Box,
  Popover,
  MenuItem,
  ListItemIcon,
  Select,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faBell,
  faCog,
  faMapMarkerAlt,
  faEllipsisV,
  faBars, // Three-dots icon
} from "@fortawesome/free-solid-svg-icons";
import ColorAvatar from "../color-avatar/ColorAvatar";

const locations = [
  "Brown Deer Village",
  "Greenfield",
  "Wauwatosa",
  "Brookfield",
];

export default function Header({ isMobile, handleDrawerToggle }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  // Open popover
  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close popover
  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px" }}>
        {/* Left: Logo & Menu */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" fontWeight="900" mr={2} color="primary.main">
            Logo
          </Typography>

          {isMobile ? (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ border: "1px solid #DDE1E5", borderRadius: 2 }}
            >
              <FontAwesomeIcon icon={faBars} size="xs" />
            </IconButton>
          ) : (
            <IconButton sx={{ border: "1px solid #DDE1E5", borderRadius: 2 }}>
              <FontAwesomeIcon icon={faGrip} size="xs" />
            </IconButton>
          )}
        </Box>

        {/* Center: Location (Hidden on Small Screens) */}

        <Box
          display={{ xs: "none", md: "flex" }}
          alignItems="center"
          gap={0}
          ml="auto"
          mr={2}
        >
          <FontAwesomeIcon icon={faMapMarkerAlt} size="md" />
          <Select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            size="small"
            displayEmpty
            renderValue={(selected) => (
              <Typography
                noWrap
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
              >
                {selected || "Select Location"}
              </Typography>
            )}
            sx={{
              border: "none",
              outline: "none",
              boxShadow: "none",
              minWidth: "150px", // Set minimum width
              maxWidth: "150px", // Set maximum width
              "& fieldset": { border: "none" }, // Remove default border
              "&:hover fieldset": { border: "none" },
              "&.Mui-focused fieldset": { border: "none" }, // Remove focus border
              "& .MuiOutlinedInput-root": {
                padding: "6px 12px",
              },
              "& .MuiSelect-select": {
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              },
            }}
          >
            {locations.map((location, index) => (
              <MenuItem key={index} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Right: Notifications, More Options, Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Notifications */}
          <IconButton>
            <Badge
              badgeContent={99}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                },
              }}
            >
              <FontAwesomeIcon icon={faBell} size="sm" />
            </Badge>
          </IconButton>

          {/* Avatar */}
          {/* <Avatar
            sx={{
              bgcolor: "orangered",
              fontSize: 14,
              width: 32,
              height: 32,
              fontWeight: "bold",
            }}
          >
            SC
          </Avatar> */}

          <ColorAvatar name="SC" />

          {/* More Options Button (Three dots) */}
          <IconButton
            onClick={handleOpenPopover}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            <FontAwesomeIcon icon={faEllipsisV} size="sm" />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Popover Menu */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: "12px", // Increased border radius
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Soft shadow
            minWidth: "160px", // Slightly wider for better spacing
            p: 1, // Add padding inside
          },
        }}
      >
        <Box display="flex" flexDirection="column">
          <MenuItem onClick={handleClosePopover} sx={{ borderRadius: "8px" }}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faCog} size="sm" color="#146ef5" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClosePopover} sx={{ borderRadius: "8px" }}>
            <ListItemIcon>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="sm"
                color="#146ef5"
              />
            </ListItemIcon>
            Location
          </MenuItem>
        </Box>
      </Popover>
    </AppBar>
  );
}
