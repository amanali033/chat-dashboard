import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Box,
  Grid,
  Paper,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import {
  Phone,
  PhoneDisabled,
  Backspace,
  Close,
  Autorenew,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { Device } from "@twilio/voice-sdk";
import { createAPIEndPoint } from "../../config/api/api";
import Draggable from "react-draggable";

const Softphone = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("+17739488924");
  const [error, setError] = useState(""); // Store error message

  const handleButtonClick = (value) => {
    setPhoneNumber((prev) => prev + value);
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => (prev.length > 1 ? prev.slice(0, -1) : "+"));
  };

  //   const handleCall = () => {
  //     if (phoneNumber.length > 1) {
  //       alert(`Calling ${phoneNumber}...`);
  //     }
  //   };

  const handleInputChange = (e) => {
    let input = e.target.value;

    // Ensure it starts with '+'
    if (!input.startsWith("+")) {
      input = "+" + input.replace(/\D/g, ""); // Remove non-numeric characters
    } else {
      input = "+" + input.slice(1).replace(/\D/g, ""); // Allow only numbers after +
    }

    // Show error if user tries to enter letters
    if (/\D/.test(e.target.value.replace("+", ""))) {
      setError("Only numbers are allowed!");
    } else {
      setError("");
    }

    setPhoneNumber(input);
  };

  const [device, setDevice] = useState(null);
  const [callStatus, setCallStatus] = useState("Initializing...");
  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [isDialing, setIsDialing] = useState(false);

  const [callLogs, setCallLogs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    initializeSoftphone();
  }, []);

  // ✅ Initialize Device
  const initializeSoftphone = async () => {
    const token = await fetchToken();
    console.log(" initializeSoftphone ~ token:", token);
    if (token) setupDevice(token);
  };

  // ✅ Fetch Twilio Token
  const fetchToken = async () => {
    try {
      //   setLoading(true);
      const response = await createAPIEndPoint(
        "token?identity=operator"
      ).fetchAll();
      return response.data.token;
    } catch (err) {
      console.log("Call logs:", err.response);
      toast.error(err?.response?.data?.error || "Error fetching call logs");
      // if (err?.response?.data?.error.includes("Bearer token has expired.")) {
      //   logoutUser(navigate);
      // }
    }
  };

  // ✅ Setup Twilio Device
  const setupDevice = (token) => {
    const twilioDevice = new Device(token, { enableRingingState: true });

    twilioDevice.on("ready", () => setCallStatus("Ready to Receive Calls"));
    twilioDevice.on("incoming", (conn) => {
      setIncomingCall(conn);
    });
    twilioDevice.on("connect", (conn) => {
      setActiveCall(conn);
      setIsDialing(false);
      setCallStatus("On Call");
    });
    twilioDevice.on("disconnect", () => {
      setActiveCall(null);
      setIncomingCall(null);
      setCallStatus("Call Ended");
      setIsDialing(false);
    });

    twilioDevice.register();
    setDevice(twilioDevice);
  };

  // ✅ Handle Incoming Call from WebSocket
  const handleIncomingCall = (data) => {
    console.log("📞 Incoming Call Event:", data);
    setIncomingCall(data);
    setCallStatus(`Incoming Call from ${data.from}`);
    setOpenDialog(true);
  };

  // ✅ Accept Incoming Call
  const acceptIncomingCall = () => {
    if (incomingCall) {
      incomingCall.accept();
      setActiveCall(incomingCall);
      setCallStatus("On Call");
    }
    setOpenDialog(false);
    setIncomingCall(null);
  };

  // ✅ Reject Incoming Call
  const rejectIncomingCall = () => {
    if (incomingCall) incomingCall.reject();
    setOpenDialog(false);
    setIncomingCall(null);
    setCallStatus("Incoming Call Rejected");
  };

  // ✅ Make Outgoing Call
  const handleCall = () => {
    if (!device) {
      toast.error("Device not ready!");
      return;
    }

    setCallStatus("Dialing...");
    setIsDialing(true);

    const connection = device.connect({ params: { To: phoneNumber } });

    console.log(" handleCall ~ connection status:", connection);
    connection.on("accept", () => {
      setActiveCall(connection); // ✅ Store connection correctly
      setIsDialing(false);
      setCallStatus("On Call");
    });

    connection.on("disconnect", () => {
      setActiveCall(null);
      setCallStatus("Call Ended");
      setIsDialing(false);
    });

    connection.on("error", (err) => {
      console.error("Call Error:", err);
      toast.error("Call failed. Try again.");
      setActiveCall(null);
      setIsDialing(false);
    });
  };

  const handleHangup = () => {
    if (activeCall && typeof activeCall.disconnect === "function") {
      activeCall.disconnect(); // ✅ Properly disconnect the call
    } else {
      console.warn("No active call to hang up");
    }
  };

  if (!isOpen) return null; // Hide Softphone if not open

  return (
    // <Draggable handle=".drag-handle" bounds="parent">
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000, // Keep it on top
      }}
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: "25px",
          pt: 3,
          mb: 2,
          //   px: 0.5,
          width: 280,
          textAlign: "center",
          //   border: "5px solid #5d9eff",
          boxShadow: "0 0 0 10px #e9ebec, 0 0 0 11px #e9ebec !important",
          //   boxShadow:
          //     "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px !important",
        }}
      >
        {/* <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 9,
            right: 9,
            color: "#f44336",
            bgcolor: "rgba(244, 67, 54, 0.1)",
            // bgcolor: "white",
            "&:hover": { bgcolor: "rgba(244, 67, 54, 0.2)" },
          }}
        >
          <Close fontSize="small" />
        </IconButton> */}
        <Typography
          variant="h6"
          gutterBottom
          color="primary"
          //   mt={2}
          fontWeight="bold"
        >
          {" "}
          Softphone {callStatus}
        </Typography>
        <Box
          sx={{
            py: 1,
            px: 3,
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={phoneNumber}
            onChange={handleInputChange}
            autoFocus
            error={!!error} // Show error style
            helperText={error} // Show error message
            inputProps={{
              inputMode: "tel",
              pattern: "[0-9+]*",
              style: { textAlign: "center", fontSize: 20 },
            }}
            sx={{
              mb: 1,
              "& .MuiOutlinedInput-root": {
                color: "#313133",
                borderRadius: "12px", // Input fields with rounded edges
              },
            }}
          />
        </Box>
        <Grid container spacing={1.5} px={0.5}>
          {[...Array(9).keys()].map((i) => (
            <Grid item xs={4} key={i + 1}>
              <Button
                variant="contained"
                sx={{
                  width: 45, // Adjust size
                  height: 45, // Same as width for round shape
                  fontSize: 16,
                  borderRadius: "50%", // Ensures the button is completely circular
                  minWidth: "unset", // Prevents default Material-UI button stretching
                  fontWeight: "bold",
                  backgroundColor: "#3b89ff",
                  boxShadow:
                    "rgb(20 110 245) 3px 3px 6px 0px inset, rgb(65 141 255) -3px -3px 6px 1px inset",
                }}
                onClick={() => handleButtonClick((i + 1).toString())}
              >
                {i + 1}
              </Button>
            </Grid>
          ))}
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{
                width: 45, // Adjust size
                height: 45, // Same as width for round shape
                fontSize: 16,
                borderRadius: "50%", // Ensures the button is completely circular
                minWidth: "unset", // Prevents default Material-UI button stretching
                fontWeight: "bold",
                backgroundColor: "#3b89ff",
                boxShadow:
                  "rgb(20 110 245) 3px 3px 6px 0px inset, rgb(65 141 255) -3px -3px 6px 1px inset",
              }}
              onClick={() => handleButtonClick("0")}
            >
              0
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" px={3} mt={"-45px"}>
          <IconButton
            onClick={() =>
              setPhoneNumber((prev) =>
                prev.length > 1 ? prev.slice(0, -1) : "+"
              )
            }
            sx={{
              bgcolor: "#f44336",
              color: "white",
              width: 45,
              height: 45,
              borderRadius: "50%",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            <Backspace sx={{ fontSize: 16 }} />
          </IconButton>

          {activeCall ? (
            <IconButton
              onClick={handleHangup}
              sx={{
                bgcolor: "#d32f2f",
                color: "white",
                width: 45,
                height: 45,
                borderRadius: "50%",
                "&:hover": { bgcolor: "#b71c1c" },
              }}
            >
              <PhoneDisabled sx={{ fontSize: 16 }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleCall}
              sx={{
                bgcolor: "#4caf50",
                color: "white",
                width: 45,
                height: 45,
                borderRadius: "50%",
                // boxShadow:
                //   "rgb(78, 159, 62) 3px 3px 6px 0px inset,rgb(78, 159, 62) -3px -3px 6px 1px inset",
                "&:hover": { bgcolor: "#388e3c" },
              }}
              disabled={phoneNumber.length <= 1 || isDialing}
            >
              {isDialing ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <Phone sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          )}

          {/* <IconButton
            onClick={() => setPhoneNumber("+")}
            sx={{
              bgcolor: "#f44336",
              color: "white",
              width: 45,
              height: 45,
              borderRadius: "50%",
              "&:hover": { bgcolor: "#d32f2f" },
            }}
          >
            <Close sx={{ fontSize: 16 }} />
          </IconButton> */}
        </Box>
        <Button
          onClick={onClose}
          sx={{
            mt: 4,
            mb: 2,
            mx: 1,
            // width: "100%",
            backgroundColor: "#ff4d4d", // Soft red (Tailwind's red-400 equivalent)
            color: "white",
            // borderRadius: "0 0 25px 25px",
            py: 0.5,
            px: 2.5,
            fontWeight: "bold",
            borderRadius: "25px",
            "&:hover": {
              backgroundColor: "#ef4444", // Slightly darker red on hover
            },
          }}
        >
          Close
        </Button>
      </Paper>
    </Box>
    // </Draggable>
  );
};

export default Softphone;
