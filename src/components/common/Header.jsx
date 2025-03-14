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
import ProfilePopover from "./components/ProfilePopover";
import NotificationPopover from "./components/NotificationPopover";
import AppMenu from "../app-menu/AppMenu";
import { useNavigate } from "react-router-dom";

const locations = [
  "Brown Deer Village",
  "Greenfield",
  "Wauwatosa",
  "Brookfield",
];

export default function Header({ isMobile, handleDrawerToggle }) {
  const navigate = useNavigate();
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
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: "64px",
          pr: !isMobile ? "0px !important" : "inherit",
        }}
      >
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
            <AppMenu />
          )}
        </Box>

        {/* Center: Location (Hidden on Small Screens) */}

        {!isMobile && (
          <Box alignItems="center" gap={0} ml="auto" mr={2}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size="md" color="#146ef5" />
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
        )}

        {/* Right: Notifications, More Options, Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Notifications */}
          <NotificationPopover />

          {/* Avatar */}
          <ProfilePopover />

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
                borderRadius: "4px", // Increased border radius
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Soft shadow
                minWidth: "160px", // Slightly wider for better spacing
                p: 1, // Add padding inside
              },
            }}
          >
            <Box display="flex" flexDirection="column">
              <MenuItem
                onClick={handleClosePopover}
                sx={{ borderRadius: "8px" }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon icon={faCog} size="sm" color="#146ef5" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem
                onClick={handleClosePopover}
                sx={{ borderRadius: "8px" }}
              >
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size="sm"
                    color="#146ef5"
                  />
                </ListItemIcon>
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
                    minWidth: "100px", // Set minimum width
                    maxWidth: "100px", // Set maximum width
                    "& fieldset": { border: "none" }, // Remove default border
                    "&:hover fieldset": { border: "none" },
                    "&.Mui-focused fieldset": { border: "none" }, // Remove focus border
                    "& .MuiOutlinedInput-root": {
                      padding: "6px 12px",
                    },
                    "& .MuiSelect-select": {
                      padding: "0px",
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
              </MenuItem>
            </Box>
          </Popover>

          {/* More Options Button (Three dots) */}
          {isMobile && (
            <Typography
              onClick={handleOpenPopover}
              sx={{
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faEllipsisV} size="lg" color="#146EF5" />
            </Typography>
          )}
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
            borderRadius: "4px", // Increased border radius
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Soft shadow
            minWidth: "160px", // Slightly wider for better spacing
            p: 1, // Add padding inside
          },
        }}
      >
        <Box display="flex" flexDirection="column">
          <MenuItem
            onClick={() => {
              navigate("/settings/change-password");
              handleClosePopover();
            }}
            sx={{ borderRadius: "8px" }}
          >
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
                minWidth: "100px", // Set minimum width
                maxWidth: "100px", // Set maximum width
                "& fieldset": { border: "none" }, // Remove default border
                "&:hover fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "none" }, // Remove focus border
                "& .MuiOutlinedInput-root": {
                  padding: "6px 12px",
                },
                "& .MuiSelect-select": {
                  padding: "0px",
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
          </MenuItem>
        </Box>
      </Popover>
    </AppBar>
  );
}
