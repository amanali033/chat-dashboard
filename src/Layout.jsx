import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCommentDots,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import RightSidebar from "./components/right-side-bar";

const menuItems = [
  {
    label: "Home",
    icon: <FontAwesomeIcon icon={faHome} size="md" />,
    subItems: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Analytics", path: "/analytics" },
    ],
  },
  {
    label: "Messages",
    icon: <FontAwesomeIcon icon={faCommentDots} size="md" />,
    subItems: [
      { label: "Inbox", path: "/inbox" },
      { label: "Scheduled", path: "/scheduled" },
      { label: "Drafts", path: "/drafts" },
      { label: "Archived", path: "/archived" },
      { label: "Blocked", path: "/blocked" },
    ],
  },
  {
    label: "Settings",
    icon: <FontAwesomeIcon icon={faCog} size="md" />,
    subItems: [
      { label: "Profile", path: "/profile" },
      { label: "Security", path: "/security" },
    ],
  },
];

export default function Layout() {
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);
  const location = useLocation();
  return (
    <>
      <Header />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 84,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              backgroundColor: "#e7ebee",
              border: "none",
              borderRadius: "0px 0.5em 0px 0px",
              width: 84,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "64px", // Prevent overlap with fixed AppBar
              height: "calc(100vh - 64px)", // Adjust drawer height
            },
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => setSelectedMenu(item)}
                className="menu_hover"
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  py: 1.15,
                  px: 0,
                  width: 84,
                  cursor: "pointer",
                  color:
                    selectedMenu.label === item.label ? "primary.main" : "",
                  backgroundColor:
                    selectedMenu.label === item.label ? "#fff" : "",
                }}
              >
                <ListItemIcon
                  sx={{
                    justifyContent: "center",
                    color:
                      selectedMenu.label === item.label ? "#146ef5" : "#202328",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight:
                      selectedMenu.label === item.label ? "bold" : "400",
                  }}
                  color="body1"
                >
                  {item.label}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <ListItem
            button
            sx={{
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
              color: "text.secondary",
            }}
          >
            <ListItemIcon sx={{ justifyContent: "center" }}>
              <FontAwesomeIcon icon={faCog} size="lg" />
            </ListItemIcon>
            <Typography variant="caption" sx={{ fontSize: 12 }}>
              Settings
            </Typography>
          </ListItem>
        </Drawer>

        <Box
          sx={{
            width: 200,
            p: "0px 0.5em",
            display: "flex",
            flexDirection: "column",
            marginTop: "74px",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {selectedMenu.label}
          </Typography>
          <List>
            {selectedMenu.subItems.map((subItem, subIndex) => {
              const isActive = location.pathname === subItem.path; // Check if active

              return (
                <ListItem
                  button
                  key={subIndex}
                  component={Link}
                  to={subItem.path}
                  sx={{
                    borderRadius: 2,
                    height: "2.5em",
                    p: "0px 1em",
                    mb: 1,
                    bgcolor: isActive ? "#e7ebee" : "transparent", // Active background
                    "&:hover": {
                      bgcolor: "#e7ebee", // Hover background
                    },
                  }}
                >
                  <ListItemText primary={subItem.label} />
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: "64px",
            border: "1px solid #DDE1E5",
            borderRadius: "8px 0px 0px",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
