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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createAPIEndPoint } from "../../config/api/api";
import NotFoundMessage from "../not-found-message/NotFoundMessage";
import RingLoader from "../loaders/RingLoader";

const MessageList = ({
  loading,
  contacts,
  selectedMessage,
  setSelectedMessage,
}) => {
  return (
    <Box sx={{ height: "100%" }}>
      <List
        sx={{
          height: "calc(100vh - 175px) !important",
          overflowY: "auto",
        }}
      >
        {loading ? (
          <RingLoader />
        ) : contacts && contacts.length > 0 ? (
          contacts.map((contact) => (
            <Box key={contact.id}>
              <ListItem
                button
                onClick={() => setSelectedMessage(contact)}
                sx={{
                  cursor: "pointer",
                  bgcolor:
                    selectedMessage?.number === contact.number
                      ? "#F4F5F7"
                      : "white",
                  borderLeft:
                    selectedMessage?.number === contact.number
                      ? "6px solid #146ef5"
                      : "6px solid transparent",
                }}
              >
                <ListItemAvatar>
                  <ColorAvatar name={contact.patient_name} />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    contact.patient_name ? contact.patient_name : "Unknown"
                  }
                  secondary={contact?.last_message}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                  secondaryTypographyProps={{
                    color: "body1",
                    textTransform: "lowercase",
                    sx: {
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1, // Ensures text is clamped to 1 line
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
                <Typography
                  variant="body2"
                  color="#424952"
                  fontSize={12}
                  mt={-2}
                  whiteSpace="nowrap"
                >
                  {contact.last_message_at
                    ? contact.last_message_at
                    : "00:00 PM"}
                </Typography>
              </ListItem>
              <Divider />
            </Box>
          ))
        ) : (
          <NotFoundMessage message="No contacts found" />
        )}
      </List>
    </Box>
  );
};

export default MessageList;
