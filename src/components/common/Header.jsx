import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faBell,
  faCog,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: "64px" }}>
        {/* Left: Logo & Menu */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" fontWeight="bold" mr={2}>
            Logo
          </Typography>
          <IconButton sx={{ border: "1px solid gray", borderRadius: 2 }}>
            <FontAwesomeIcon icon={faGrip} size="sm" />
          </IconButton>
        </Box>

        {/* Center: Location */}
        <Box display="flex" alignItems="center" gap={1} ml="auto">
          <FontAwesomeIcon icon={faMapMarkerAlt} size="md" />
          <Typography variant="body1">Brown Deer Village</Typography>
        </Box>

        {/* Right: Notifications, Settings, Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <Badge badgeContent={99} color="error">
              <FontAwesomeIcon icon={faBell} size="sm" />
            </Badge>
          </IconButton>
          <IconButton>
            <FontAwesomeIcon icon={faCog} size="sm" />
          </IconButton>
          <Avatar sx={{ bgcolor: "teal", fontSize: 14, width: 32, height: 32 }}>
            SC
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
