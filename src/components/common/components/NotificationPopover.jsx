import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ColorAvatar from "../../color-avatar/ColorAvatar";

const notifications = [
  {
    id: 1,
    message: "New appointment request from John Doe",
    time: "2 min ago",
    initials: "JD",
  },
  {
    id: 2,
    message: "Reminder: Dental cleaning for Sarah at 3 PM",
    time: "10 min ago",
    initials: "SC",
  },
  {
    id: 3,
    message: "Your prescription for pain relief has been approved",
    time: "1 hr ago",
    initials: "PR",
  },
  {
    id: 4,
    message: "Dr. Smith left a note on your treatment plan",
    time: "2 hrs ago",
    initials: "DS",
  },
  {
    id: 5,
    message: "Your X-ray results are ready for review",
    time: "3 hrs ago",
    initials: "XR",
  },
];

const NotificationPopover = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Badge
          badgeContent={notifications.length}
          sx={{
            "& .MuiBadge-badge": { backgroundColor: "#e74c3c", color: "#fff" },
          }}
        >
          <FontAwesomeIcon icon={faBell} size="sm" />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: "4px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "160px",
          },
        }}
      >
        <List sx={{ width: 250, maxHeight: 300, overflowY: "auto" }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          ) : (
            notifications.map((notif, index) => (
              <React.Fragment key={notif.id}>
                <ListItem>
                  <ListItemAvatar>
                    <ColorAvatar name={notif.initials} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={notif.message}
                    secondary={notif.time}
                    primaryTypographyProps={{
                      fontWeight: "500",
                      fontSize: 14,
                      sx: {
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                      },
                    }}
                    secondaryTypographyProps={{
                      color: "body1",
                      fontSize: "12px",
                    }}
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Popover>
    </div>
  );
};

export default NotificationPopover;
