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

const MessageList = ({ messages, selectedMessage, setSelectedMessage }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <List>
        {messages.map((msg) => (
          <Box key={msg.id}>
            <ListItem
              button
              onClick={() => setSelectedMessage(msg)}
              sx={{
                bgcolor: selectedMessage?.id === msg.id ? "#F4F5F7" : "white",
                borderLeft:
                  selectedMessage?.id === msg.id
                    ? "6px solid #146ef5"
                    : "6px solid transparent",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: msg.color, fontSize: 15, fontWeight: "bold" }}
                >
                  {msg.initials}
                </Avatar>
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
