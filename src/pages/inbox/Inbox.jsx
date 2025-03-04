import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { faFilter, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatView from "../../components/chat-view/ChatView";
import RightSidebar from "../../components/right-side-bar";
import MessageList from "../../components/message-list/MessageList";

const messages = [
  {
    id: 1,
    name: "Keshia Whitlow",
    initials: "KW",
    time: "10:52 PM",
    text: "Yes",
    color: "teal",
  },
  {
    id: 2,
    name: "Ira Johnson",
    initials: "IJ",
    time: "10:48 PM",
    text: "Confirm",
    color: "pink",
  },
  {
    id: 3,
    name: "Jayla James",
    initials: "JJ",
    time: "10:44 PM",
    text: "Yes",
    color: "gray",
  },
  {
    id: 4,
    name: "Charlotte White",
    initials: "CW",
    time: "10:43 PM",
    text: "Okay",
    color: "lightgray",
  },
  {
    id: 5,
    name: "Estelle Cann",
    initials: "EC",
    time: "10:40 PM",
    text: "Yes",
    color: "blue",
  },
  {
    id: 6,
    name: "Charmaine Griffin",
    initials: "CG",
    time: "10:36 PM",
    text: "Yes",
    color: "purple",
  },
  {
    id: 7,
    name: "Myron Williams",
    initials: "MW",
    time: "10:36 PM",
    text: "yes",
    color: "gray",
  },
];

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState(null);

  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box sx={{ width: 400, borderRight: "1px solid #ddd" }}>
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
              sx={{ cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}
            >
              Select
            </Typography>
            <IconButton>
              <FontAwesomeIcon icon={faFilter} size="sm" />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faPenToSquare} size="sm" />
            </IconButton>
          </Box>
        </Box>

        {/* Filter Buttons */}
        <Box display="flex" gap={1} sx={{ mb: 2, px: "16px" }}>
          {["Unread", "Unreplied", "Read", "Replied", "Error"].map((filter) => (
            <Button
              key={filter}
              variant="outlined"
              size="small"
              sx={{
                textTransform: "none",
                border: "1px solid #6f7780",
                color: "#202328",
                p: "2px 8px",
              }}
            >
              {filter}
            </Button>
          ))}
        </Box>

        {/* Messages List */}
        <MessageList
          messages={messages}
          selectedMessage={selectedMessage}
          setSelectedMessage={setSelectedMessage}
        />
      </Box>

      {/* Chat View */}
      <ChatView selectedChat={selectedMessage} />

      <RightSidebar />
    </Box>
  );
}
