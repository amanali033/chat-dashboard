import { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCommentDots,
  faCog,
  faBars,
  faClose,
  faPhone,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/common/Header";

const menuItems = [
  // {
  //   label: "Home",
  //   icon: <FontAwesomeIcon icon={faHome} size="md" />,
  //   subItems: [
  //     { label: "Dashboard", path: "/dashboard" },
  //     { label: "Analytics", path: "/analytics" },
  //   ],
  // },
  {
    label: "Messages",
    icon: <FontAwesomeIcon icon={faCommentDots} size="md" />,
    subItems: [
      { label: "Inbox", path: "/messages/inbox" },
      { label: "Scheduled", path: "/messages/scheduled" },
      { label: "Drafts", path: "/messages/drafts" },
      { label: "Archived", path: "/messages/archived" },
      { label: "Blocked", path: "/messages/blocked" },
    ],
  },
  {
    label: "Calls",
    icon: <FontAwesomeIcon icon={faPhoneVolume} size="md" />,
    subItems: [
      { label: "Recent Calls", path: "/calls/recent" },
      { label: "Voicemails", path: "/calls/voicemails" },
      { label: "Call Queue Data", path: "/calls/queue-data" },
      { label: "AI Calls", path: "/calls/ai-calls" },
    ],
  },
  // {
  //   label: "Settings",
  //   icon: <FontAwesomeIcon icon={faCog} size="md" />,
  //   subItems: [
  //     { label: "Profile", path: "/profile" },
  //     { label: "Security", path: "/security" },
  //   ],
  // },
];

export default function Layout() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  console.log(" Layout ~ location:", location.pathname)
  const isMobile = useMediaQuery("(max-width: 992px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (item) => {
    setSelectedMenu(item);
    if (item.subItems.length > 0) {
      navigate(item.subItems[0].path);
    }
  };

  useEffect(() => {
    handleDrawerToggle();
  }, [navigate]);

  useEffect(() => {
    const activeMenu = menuItems.find((item) =>
      item.subItems.some((subItem) => subItem.path === location.pathname)
    );

    if (activeMenu) {
      setSelectedMenu(activeMenu);
    }
  }, [location.pathname]);

  return (
    <>
      <Header isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} />

      <Box sx={{ display: "flex", height: "100vh" }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          sx={{
            width: isMobile ? "auto" : 84,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              backgroundColor: isMobile ? "#fff" : "#e7ebee",
              border: "none",
              borderRadius: "0px 0.5em 0px 0px",
              width: isMobile ? "auto" : 84,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: isMobile ? "0" : "64px",
              height: isMobile ? "100vh" : "calc(100vh - 64px)",
            },
          }}
        >
          {isMobile && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                my: 2,
                px: 2,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="900"
                mr={2}
                color="primary.main"
              >
                Logo
              </Typography>
              <FontAwesomeIcon
                onClick={handleDrawerToggle}
                style={{ position: "absolute", top: "12px", right: "12px" }}
                icon={faClose}
                color="#e74c3c"
                size="xl"
              />
            </Box>
          )}
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <List
              sx={{
                display: "flex",
                py: isMobile ? 0 : "8px",
                backgroundColor: "#e7ebee",
                borderRadius: "0px 0.5em 0px 0px",
              }}
            >
              <div>
                {menuItems?.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleMenuClick(item)}
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
                          selectedMenu.label === item.label
                            ? "#146ef5"
                            : "#202328",
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
              </div>
            </List>

            {isMobile && (
              <Box
                sx={{
                  width: 200,
                  p: "0px 0.5em",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  flexGrow: 1, // This makes it take available space
                  pt: 2,
                }}
              >
                <Typography variant="h6" fontSize={16} fontWeight="bold">
                  {selectedMenu.label}
                </Typography>
                <List>
                  {selectedMenu?.subItems?.map((subItem, subIndex) => {
                    const isActive = location.pathname === subItem.path;

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
                          bgcolor: isActive ? "#e7ebee" : "transparent",
                          "&:hover": {
                            bgcolor: "#e7ebee",
                          },
                        }}
                      >
                        <ListItemText primary={subItem.label} />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            )}
          </Box>
          {!isMobile && (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <ListItem
                className="menu_hover"
                button
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  mb: 2,
                  color:
                    location.pathname === "/settings/change-password"
                      ? "#146ef5"
                      : "#202328",
                  backgroundColor:
                    location.pathname === "/settings/change-password"
                      ? "#fff"
                      : "",
                }}
                onClick={() => navigate("/settings/change-password")}
              >
                <ListItemIcon
                  sx={{
                    justifyContent: "center",
                    color:
                      location.pathname === "/settings/change-password"
                        ? "#146ef5"
                        : "#202328",
                  }}
                >
                  <FontAwesomeIcon icon={faCog} size="md" />
                </ListItemIcon>
                <Typography variant="caption" sx={{ fontSize: 12 }}>
                  Settings
                </Typography>
              </ListItem>
            </>
          )}
        </Drawer>

        {/* Sidebar for submenu */}
        {!isMobile && (
          <Box
            sx={{
              minWidth: "200px",
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
              {selectedMenu?.subItems?.map((subItem, subIndex) => {
                const isActive = location.pathname === subItem.path;
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
                      bgcolor: isActive ? "#e7ebee" : "transparent",
                      "&:hover": { bgcolor: "#e7ebee" },
                    }}
                  >
                    <ListItemText primary={subItem.label} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}

        {/* Main Content */}

        <Box
          component="main"
          className="wrapper"
          sx={{
            flexGrow: 1,
            display: "flex",
            mt: "64px",
            border: "1px solid #DDE1E5",
            borderRadius: isMobile ? "0px" : "8px 0px 0px",
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
