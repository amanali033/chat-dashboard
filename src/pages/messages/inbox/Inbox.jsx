import { useState } from "react";
import {
  useMediaQuery,
  Box,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { faFilter, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatView from "../../../components/chat-view/ChatView";
import RightSidebar from "../../../components/right-side-bar";
import MessageList from "../../../components/message-list/MessageList";

const messages = [
  {
    id: 1,
    name: "Keshia Whitlow",
    initials: "KW",
    time: "10:52 PM",
    text: "Yes",
    color: "#A8E6CF",
  },
  {
    id: 2,
    name: "Ira Johnson",
    initials: "IJ",
    time: "10:48 PM",
    text: "Confirm",
    color: "#FFCAD4",
  },
  {
    id: 3,
    name: "Jayla James",
    initials: "JJ",
    time: "10:44 PM",
    text: "Yes",
    color: "#D3D3D3",
  },
  {
    id: 4,
    name: "Charlotte White",
    initials: "CW",
    time: "10:43 PM",
    text: "Okay",
    color: "#F5F5F5",
  },
];

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box display="flex" height="100vh">
      {/* Show only message list on mobile, switch to chat when a message is selected */}
      {(!isMobile || !selectedMessage) && (
        <Box
          sx={{ width: isMobile ? "100%" : 400, borderRight: "1px solid #ddd" }}
        >
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2, p: "24px 16px 0px 16px" }}
          >
            <Typography variant="h5" fontWeight="bold">
              Inbox
            </Typography>
            <Box display="flex" alignItems="center" gap="8px">
              <Typography
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Select
              </Typography>
              <IconButton>
                <FontAwesomeIcon icon={faFilter} size="xs" />
              </IconButton>
              <IconButton>
                <FontAwesomeIcon icon={faPenToSquare} size="xs" />
              </IconButton>
            </Box>
          </Box>

          {/* Filter Buttons */}
          <Box
            display="flex"
            gap={1}
            sx={{ mb: 2, px: "16px", overflowX: "auto", py: 1 }}
          >
            {["Unread", "Unreplied", "Read", "Replied", "Error"].map(
              (filter) => (
                <Button
                  key={filter}
                  variant="outlined"
                  size="small"
                  sx={{
                    minWidth: "auto",
                    textTransform: "none",
                    border: "1px solid #6f7780",
                    color: "#202328",
                    p: "2px 8px",
                  }}
                >
                  {filter}
                </Button>
              )
            )}
          </Box>

          {/* Messages List */}
          <MessageList
            messages={messages}
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
          />
        </Box>
      )}

      {/* Show chat only when a message is selected on mobile */}
      {(!isMobile || selectedMessage) && (
        <ChatView
          selectedChat={selectedMessage}
          onBack={() => setSelectedMessage(null)}
        />
      )}


    </Box>
  );
}
