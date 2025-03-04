import {
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FaPhone, FaEnvelope, FaUser, FaRegPaperPlane } from "react-icons/fa";
import SendIcon from "@mui/icons-material/Send";

const ChatView = ({ selectedChat }) => {
  const dummyMessages = [
    {
      id: 1,
      text: "Hey, are we still on for lunch tomorrow?",
      sender: "user",
      date: "Mar 1, 2024",
    },
    {
      id: 2,
      text: "Don't forget to bring the documents for the meeting.",
      sender: "user",
      date: "Mar 2, 2024",
    },
    {
      id: 3,
      text: "Reminder: Your package is out for delivery today.",
      sender: "clinic",
      date: "Mar 3, 2024",
    },
    {
      id: 4,
      text: "Hi, just checking in! How have you been?",
      sender: "user",
      date: "Mar 4, 2024",
    },
    {
      id: 5,
      text: "Your payment of $250 has been received. Thank you!",
      sender: "clinic",
      date: "Mar 5, 2024",
    },
    {
      id: 6,
      text: "Your flight to New York has been rescheduled to 6:30 PM.",
      sender: "clinic",
      date: "Mar 6, 2024",
    },
    {
      id: 7,
      text: "Meeting rescheduled to 10 AM instead of 9 AM.",
      sender: "clinic",
      date: "Mar 7, 2024",
    },
    {
      id: 8,
      text: "Your subscription will expire in 3 days. Renew now to continue services.",
      sender: "clinic",
      date: "Mar 8, 2024",
    },
  ];

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      {selectedChat ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            display="flex"
            alignItems="center"
            gap="8px"
            p={2}
            borderBottom="1px solid #ddd"
            bgcolor="white"
            position="sticky"
            top={0}
            zIndex={10}
          >
            <Avatar sx={{ bgcolor: selectedChat.color }}>
              {selectedChat?.initials}
            </Avatar>
            <Box flex={1}>
              <Typography fontWeight="bold">{selectedChat?.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Female • 51 • Active
              </Typography>
            </Box>
            <IconButton
              sx={{
                border: "1px solid #6f7780",
                color: "#202328",
                borderRadius: "8px",
              }}
            >
              <FaPhone size="14px" />
            </IconButton>
            <IconButton
              sx={{
                border: "1px solid #6f7780",
                color: "#202328",
                borderRadius: "8px",
              }}
            >
              <FaEnvelope size="14px" />
            </IconButton>
            <IconButton
              sx={{
                border: "1px solid #6f7780",
                color: "#202328",
                borderRadius: "8px",
              }}
            >
              <FaUser size="14px" />
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box flex={1} overflow="auto" px={2} pb={8}>
            {dummyMessages.map((msg) => (
              <Box key={msg.id} mb={2} display="flex" flexDirection="column">
                <Typography
                  variant="caption"
                  color="#6f7780"
                  textAlign="center"
                  p="2px 8px"
                  borderRadius={2}
                  mb={2}
                  width="fit-content"
                  mx="auto"
                  sx={{
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  {msg.date}
                </Typography>
                <Box
                  sx={{
                    backgroundColor:
                      msg.sender === "clinic" ? "#e8f5e9" : "#f3f4f6",
                    p: "16px",
                    borderRadius: "8px",
                    maxWidth: "75%",
                    alignSelf:
                      msg.sender === "clinic" ? "flex-start" : "flex-end",
                    ml: msg.sender !== "clinic" ? "auto" : "0",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Input Field */}
          <Box
            display="flex"
            alignItems="center"
            pt={2}
            px={2}
            borderTop="1px solid #ddd"
            bgcolor="white"
            position="sticky"
            bottom={0}
          >
            <TextField
              fullWidth
              placeholder="Type something..."
              variant="outlined"
              size="small"
              multiline
              rows={4}
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  outline: "none",
                  paddingRight: "48px", // Ensure space for button
                  backgroundColor: "white",
                  padding: 0,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ position: "absolute", bottom: 8, right: 8 }}
                  >
                    <IconButton
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        borderRadius: 1,
                        "&:hover": { bgcolor: "primary.dark" },
                      }}
                    >
                      <SendIcon sx={{ fontSize: 16 }} />{" "}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex={1}
        >
          <Typography variant="h6" color="textSecondary">
            No chat selected
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatView;
