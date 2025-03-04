// import "./App.css";
// import { Device } from "@twilio/voice-sdk";
// import React, { useState, useEffect } from "react";
// import { Button, Card, Typography, TextField, Box } from "@mui/material";
// import axios from "axios";

// function App() {
//   const [device, setDevice] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [status, setStatus] = useState("Initializing...");
//   const [isCalling, setIsCalling] = useState(false);

//   useEffect(() => {
//     const setupTwilio = async () => {
//       try {
//         const response = await axios.post("http://localhost:5000/get-token", {
//           identity: "user",
//         });
//         const token = response.data.token;

//         const twilioDevice = new Device(token, {
//           codecPreferences: ["opus", "pcmu"],
//           fakeLocalDTMF: true,
//           enableRingingState: true,
//         });

//         twilioDevice.on("ready", () => setStatus("Ready to make calls"));
//         twilioDevice.on("error", (error) =>
//           setStatus(`Error: ${error.message}`)
//         );
//         twilioDevice.on("disconnect", () => setIsCalling(false));

//         setDevice(twilioDevice);
//       } catch (error) {
//         setStatus("Error setting up Twilio");
//       }
//     };

//     setupTwilio();
//   }, []);

//   const makeCall = () => {
//     if (!device || !phoneNumber) return;
//     setIsCalling(true);
//     setStatus("Calling...");

//     const connection = device.connect({
//       params: { To: phoneNumber },
//     });

//     connection.on("disconnect", () => {
//       setIsCalling(false);
//       setStatus("Call Ended");
//     });
//   };

//   return <>
//    <Card sx={{ width: 300, height: 500, borderRadius: 5, boxShadow: 5, p: 2, display: "flex", flexDirection: "column", alignItems: "center", bgcolor: "#000", color: "#fff" }}>
//       <Typography variant="h6">📞 Twilio Voice Call</Typography>
//       <Box sx={{ width: "90%", bgcolor: "#222", borderRadius: 3, p: 2 }}>
//         <TextField fullWidth variant="outlined" sx={{ bgcolor: "white", mb: 2 }} label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//         <Button variant="contained" color="success" fullWidth onClick={makeCall} disabled={isCalling}>
//           {isCalling ? "Calling..." : "Call"}
//         </Button>
//         <Typography sx={{ mt: 2, textAlign: "center" }}>{status}</Typography>
//       </Box>
//     </Card></>;
// }

// export default App;

import MainRouter from "./MainRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import "./App.css";

function App() {
  return (
    <>
      <CssBaseline />
      <MainRouter />
    </>
  );
}

export default App;
