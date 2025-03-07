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
                  <ColorAvatar name={contact.initials} />
                </ListItemAvatar>

                <ListItemText
                  primary={contact.number ? contact.number : "Unknown"}
                  secondary={contact?.last_message}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                  secondaryTypographyProps={{
                    color: "body1",
                    textTransform: "lowercase",
                  }}
                />
                <Typography
                  variant="body2"
                  color="#424952"
                  fontSize={12}
                  mt={-2}
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

        {/* {messages.map((contact) => (
          <Box key={contact.id}>
            <ListItem
              button
              onClick={() => setSelectedMessage(contact)}
              sx={{
                cursor: "pointer",
                bgcolor: selectedMessage?.id === contact.id ? "#F4F5F7" : "white",
                borderLeft:
                  selectedMessage?.id === contact.id
                    ? "6px solid #146ef5"
                    : "6px solid transparent",
              }}
            >
              <ListItemAvatar>
                <ColorAvatar name={contact.initials} />
              </ListItemAvatar>

              <ListItemText
                primary={contact.name}
                secondary={contact.text}
                primaryTypographyProps={{ fontWeight: "bold" }}
                secondaryTypographyProps={{ color: "body1" }}
              />
              <Typography variant="body2" color="#424952" fontSize={12} mt={-2}>
                {contact.time}
              </Typography>
            </ListItem>
            <Divider />
          </Box>
        ))} */}
      </List>
    </Box>
  );
};

export default MessageList;
