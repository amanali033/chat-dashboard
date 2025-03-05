import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import ColorAvatar from "../color-avatar/ColorAvatar";

const MessageList = ({ messages, selectedMessage, setSelectedMessage }) => {
  const getContrastColor = (hex) => {
    // Convert hex to RGB
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return dark text for light backgrounds, white text for dark backgrounds
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <Box sx={{ height: "100%" }}>
      <List
        sx={{
          height: "calc(100vh - 175px) !important",
          overflowY: "auto",
        }}
      >
        {messages.map((msg) => (
          <Box key={msg.id}>
            <ListItem
              button
              onClick={() => setSelectedMessage(msg)}
              sx={{
                cursor: "pointer",
                bgcolor: selectedMessage?.id === msg.id ? "#F4F5F7" : "white",
                borderLeft:
                  selectedMessage?.id === msg.id
                    ? "6px solid #146ef5"
                    : "6px solid transparent",
              }}
            >
              <ListItemAvatar>
                {/* <Avatar
                  sx={{
                    bgcolor: msg.color,
                    color: "#333333",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  {msg.initials}
                </Avatar> */}
                <ColorAvatar name={msg.initials} />
              </ListItemAvatar>

              <ListItemText
                primary={msg.name}
                secondary={msg.text}
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondaryTypographyProps={{ color: "body1" }}
              />
              <Typography variant="body2" color="#424952" fontSize={12} mt={-2}>
                {msg.time}
              </Typography>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default MessageList;
