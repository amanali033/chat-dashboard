import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Import dropdown icon
import ColorAvatar from "../../color-avatar/ColorAvatar";
import { useNavigate } from "react-router-dom";

const ProfilePopover = () => {
  let user = null;
  if (typeof localStorage !== "undefined") {
    try {
      user = JSON.parse(localStorage.getItem("user_profile") || "null");
    } catch (error) {
      console.error("Error parsing user_profile from localStorage:", error);
      user = null;
    }
  }

  const userName = `${user.first_name} ${user.last_name}`;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_profile");
    localStorage.removeItem("user_role");
    navigate("/auth/sign-in");
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "end",
          cursor: "pointer",
        }}
      >
        <ColorAvatar name={userName} />
        <ArrowDropDownIcon
          color="action"
          sx={{ position: "relative", left: "-7px", bottom: "-5px" }}
        />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          mt: 1,
          "& .MuiPaper-root": {
            borderRadius: "4px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            minWidth: "140px",
            py: 0.5,
          },
        }}
      >
        <div>
          <MenuItem
            onClick={() => {
              navigate("/user-profile");
              handleClose();
            }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <PersonIcon style={{ marginRight: "10px" }} color="primary" />
            <Typography variant="body1">Profile</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center" }}
          >
            <ExitToAppIcon style={{ marginRight: "10px", color: "#e74c3c" }} />
            <Typography variant="body1">Logout</Typography>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

export default ProfilePopover;
