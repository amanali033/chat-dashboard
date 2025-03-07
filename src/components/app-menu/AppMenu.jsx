import { useEffect, useState } from "react";
import { IconButton, Popover, Box, Grid, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock"; // For Auth
import VpnKeyIcon from "@mui/icons-material/VpnKey"; // For Panacea Credentials
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"; // For Appointments
import KeyIcon from "@mui/icons-material/Key"; // For Credentials

import panaceaLogo from "../../assets/app-menu-logos/panacea-logo.png";
import preAuthLogo from "../../assets/app-menu-logos/360-solution.png";
import { createAPIEndPoint } from "../../config/api/api";
import toast from "react-hot-toast";
import { getUserData } from "../../utils";
import { Link } from "react-router-dom";
import { createAPIEndPointAuth } from "../../config/api/apiAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";

const icons = [
  { icon: LockIcon, label: "Auth", color: "#1976d2" }, // Blue
  { icon: VpnKeyIcon, label: "Panacea", color: "#8bc34a", logo: panaceaLogo }, // Green
  { icon: LocalHospitalIcon, label: "Appointments", color: "#f44336" }, // Red
  { icon: KeyIcon, label: "Credentials", color: "#8e24aa" }, // Purple
  // { icon: 'img', label: "Pre Auth", color: "#f57c00", logo: preAuthLogo }, // Orange (Pre Auth logo)
];

const AppMenu = () => {
  let token =
    typeof localStorage !== "undefined" && localStorage.getItem("access_token");

  const [anchorEl, setAnchorEl] = useState(null);

  // const userData = getUserData();
  // const userId = userData?.id ?? null;

  let user = null;
  if (typeof localStorage !== "undefined") {
    try {
      user = JSON.parse(localStorage.getItem("user_profile") || "null");
    } catch (error) {
      console.error("Error parsing user_profile from localStorage:", error);
      user = null;
    }
  }

  const userId = user?.id ?? null;

  const [apps, setApps] = useState([]);
  console.log("AppMenu ~ apps:", apps);

  const fetchUserApps = async () => {
    try {
      const response = await createAPIEndPointAuth(
        "user_dashboards/"
      ).fetchById(userId);
      setApps(response.data.dashboards || []);
    } catch (err) {
      console.log(err?.response?.data?.error || "Error fetching dashboards");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserApps();
    }
  }, [userId]);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const redirectToDashboard = async (url) => {
    try {
      if (url) {
        const redirectURL = `${url}?token=${token}`;
        window.open(redirectURL, "_blank");
      } else {
        console.error("No redirect URL found in response");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Error fetching dashboards");
    }
  };

  return (
    <Box display="flex" alignItems="center">
      {/* Apps Button */}
      <IconButton
        onClick={handleClick}
        sx={{ border: "1px solid #DDE1E5", borderRadius: 2 }}
      >
        <FontAwesomeIcon icon={faGrip} size="xs" />
      </IconButton>

      {/* Popover Menu */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: 2,
            maxWidth: "300px",
            padding: "1px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Soft shadow
            position: "relative",
            border: "1px solid #DDE1E5",
            // background: "linear-gradient(to right,rgb(185, 207, 240), #146ef5)",
          },
        }}
      >
        <Box
          p={2}
          bgcolor="white"
          color="black"
          borderRadius={"2px"}
          width="100%"
          maxWidth={300}
          overflow="hidden"
        >
          <Grid container rowSpacing={2}>
            {apps && apps.length > 0 ? (
              apps.map((app, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <div
                    onClick={() => redirectToDashboard(app.dashboard_url)}
                    style={{ cursor: "pointer" }}
                  >
                    {app?.image === "image" ? (
                      <img
                        src={app.image}
                        alt={app.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          margin: "0 auto",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          backgroundColor: "#E5F9F8",
                          color: "#1785C6",
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 15px auto",
                          textTransform: "uppercase",
                        }}
                      >
                        {app?.name?.charAt(0) || "?"}
                      </Box>
                    )}
                    <Typography
                      textTransform="capitalize"
                      mt={1}
                      textAlign="center"
                      variant="body2"
                      sx={{
                        fontSize: "12px",
                      }}
                    >
                      {app?.name || "Unknown"}
                    </Typography>
                  </div>
                </Grid>
              ))
            ) : (
              <Typography color="#71717a" mt={2} mx="auto">
                No apps found
              </Typography>
            )}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
};

export default AppMenu;
