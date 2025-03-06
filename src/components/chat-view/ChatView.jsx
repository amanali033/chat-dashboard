import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { FaPhone, FaEnvelope, FaUser, FaArrowLeft } from "react-icons/fa";
import SendIcon from "@mui/icons-material/Send";
import RingLoader from "../loaders/RingLoader";
import ColorAvatar from "../color-avatar/ColorAvatar";
import { createAPIEndPoint } from "../../config/api/api";
import toast from "react-hot-toast";

const ChatView = ({ selectedChat, onBack }) => {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); // Store chat messages
  const chatContainerRef = useRef(null);

  // Fetch messages from API
  const getMessages = async () => {
    try {
      setLoading(true);
      const response = await createAPIEndPoint(
        `chat-messages?contact_number=${selectedChat.number}`
      ).fetchAll();
      const apiMessages = response.data || [];

      // Transform messages to match expected structure
      const formattedMessages = apiMessages.map((msg) => ({
        id: msg.id,
        text: msg.body,
        sender: msg.direction === "outgoing" ? "user" : "clinic",
        date: new Date(msg.created_at).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }));

      setMessages(formattedMessages);
    } catch (err) {
      console.log("Messages Error:", err.response);
      toast.error(err?.response?.data?.error || "Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      getMessages();
    }
  }, [selectedChat]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    const newMessage = {
      // id: messages.length + 1,
      text: message,
      sender: "user",
      date: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    // Optimistically update UI
    setMessages([...messages, newMessage]);
    setMessage("");

    try {
      await createAPIEndPoint("send-message").create({
        to: selectedChat.number,
        message,
      });
    } catch (error) {
      console.error("Send Message Error:", error.response);
      toast.error("Failed to send message");
    }
  };

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
            {isMobile && (
              <IconButton
                onClick={onBack}
                sx={{
                  backgroundColor: "#E3F2FD",
                  color: "primary.main",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#BBDEFB" },
                }}
              >
                <FaArrowLeft size="14px" />
              </IconButton>
            )}

            <ColorAvatar name={selectedChat?.initials} />
            <Box flex={1}>
              <Typography fontWeight="bold">
                {selectedChat.number ? selectedChat.number : "Unknown"}
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
          <Box
            ref={chatContainerRef}
            flex={1}
            overflow="auto"
            pt={2}
            pb={8}
            position="relative"
          >
            {loading ? (
              <RingLoader />
            ) : (
              messages.map((msg) => (
                <Box
                  key={msg.id}
                  mb={2}
                  display="flex"
                  flexDirection="column"
                  px={2}
                >
                  <Typography
                    variant="caption"
                    color="#6f7780"
                    textAlign="center"
                    p="2px 8px"
                    borderRadius={2}
                    mb={2}
                    width="fit-content"
                    mx="auto"
                    sx={{ backgroundColor: "#f3f4f6" }}
                  >
                    {msg.date}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor:
                        msg.sender === "clinic" ? "#e8f5e9" : "#f3f4f6",
                      p: "12px 16px",
                      borderRadius: "8px",
                      maxWidth: "75%",
                      alignSelf:
                        msg.sender === "clinic" ? "flex-start" : "flex-end",
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                  </Box>
                </Box>
              ))
            )}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  outline: "none",
                  paddingRight: "48px",
                  backgroundColor: "white",
                  padding: 0,
                },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
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
                      onClick={handleSendMessage}
                      sx={{
                        bgcolor:
                          message.trim() === "" ? "#9EC5FF" : "primary.main",
                        color: "white",
                        cursor:
                          message.trim() === "" ? "not-allowed" : "pointer",
                        borderRadius: 1,
                        "&:hover": {
                          bgcolor:
                            message.trim() === "" ? "#9EC5FF" : "primary.dark",
                        },
                      }}
                    >
                      <SendIcon sx={{ fontSize: 16 }} />
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
          <Typography variant="h6" fontWeight="400" color="#424952">
            No chat selected
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatView;
