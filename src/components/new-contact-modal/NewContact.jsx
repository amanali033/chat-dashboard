import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createAPIEndPoint } from "../../config/api/api";
import toast from "react-hot-toast";
import ButtonLoader from "../loaders/ButtonLoader";

const NewContactModal = ({ open, onClose, getContacts }) => {
  const [contactNumber, setContactNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateContact = () => {
    if (!contactNumber.trim()) {
      setError("Contact number is required.");
      return false;
    }

    setError("");
    return true;
  };

  const handleAddContact = async () => {
    if (!validateContact()) return;

    try {
      setLoading(true);
      await createAPIEndPoint("send-message").create({
        to: contactNumber,
        message: "INITIAL_MESSAGE_SENT",
      });
      onClose();
      toast.success("Contact added successfully!");
      setLoading(false);
      getContacts();
    } catch (error) {
      setLoading(false);
      console.error("Send Message Error:", error.response);
      toast.error("Failed to create contact");
    }
  };

  useEffect(() => {
    if (!open) {
      setContactNumber("");
      setError("");
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 8,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }} color="primary">
        Add New Contact
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <FontAwesomeIcon icon={faClose} color="#e74c3c" size="md" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          fullWidth
          label="Contact Number"
          variant="outlined"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          margin="dense"
          error={!!error}
          helperText={error}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button
          onClick={onClose}
          color="body1"
          sx={{
            backgroundColor: "#ecf0f1",
            color: "#7f8c8d",
            "&:hover": { backgroundColor: "#dfe6e9" },
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleAddContact} color="primary" variant="contained">
          {loading ? <ButtonLoader /> : "Add Contact"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewContactModal;
