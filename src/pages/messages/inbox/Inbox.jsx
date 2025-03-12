import { useEffect, useState } from "react";
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
import NewContactModal from "../../../components/new-contact-modal/NewContact";
import { createAPIEndPoint } from "../../../config/api/api";
import toast from "react-hot-toast";

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNewContactClick = () => {
    setOpenModal(true);
    handleMenuClose();
  };

  const getContacts = async () => {
    try {
      setLoading(true);
      const response = await createAPIEndPoint("chat-contacts").fetchAll();
      setContacts(response.data?.contacts || []);
      console.log("Contacts:", response.data);
    } catch (err) {
      console.log("Contacts:", err.response);
      toast.error(err?.response?.data?.error || "Error fetching contacts");
      // if (err?.response?.data?.error.includes("Bearer token has expired.")) {
      //   logoutUser(navigate);
      // }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

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
            loading={loading}
            contacts={contacts}
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
          />
        </Box>
      )}

      {/* Show chat only when a message is selected on mobile */}
      {(!isMobile || selectedMessage) && (
        <ChatView
          contacts={contacts}
          selectedChat={selectedMessage}
          onBack={() => setSelectedMessage(null)}
        />
      )}

      <RightSidebar
        menuItems={[
          {
            label: "New Contact",
            onClick: () => setOpenModal(true),
          },
        ]}
      />

      {/* New Contact Modal */}
      <NewContactModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        getContacts={getContacts}
      />
    </Box>
  );
}
