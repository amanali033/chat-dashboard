import React from "react";
import { Avatar } from "@mui/material";

const colorMap = {
  initial: { bg: "#E7EBEE", text: "#202328" },
  A: { bg: "#FFCDD2", text: "#D32F2F" },
  B: { bg: "#F8BBD0", text: "#C2185B" },
  C: { bg: "#E1BEE7", text: "#7B1FA2" },
  D: { bg: "#D1C4E9", text: "#512DA8" },
  E: { bg: "#C5CAE9", text: "#303F9F" },
  F: { bg: "#BBDEFB", text: "#1976D2" },
  G: { bg: "#B3E5FC", text: "#0288D1" },
  H: { bg: "#B2EBF2", text: "#0097A7" },
  I: { bg: "#B2DFDB", text: "#00796B" },
  J: { bg: "#C8E6C9", text: "#388E3C" },
  K: { bg: "#DCEDC8", text: "#689F38" },
  L: { bg: "#F0F4C3", text: "#AFB42B" },
  M: { bg: "#FFF9C4", text: "#FBC02D" },
  N: { bg: "#FFECB3", text: "#FFA000" },
  O: { bg: "#FFE0B2", text: "#F57C00" },
  P: { bg: "#FFCCBC", text: "#E64A19" },
  Q: { bg: "#D7CCC8", text: "#5D4037" },
  R: { bg: "#CFD8DC", text: "#455A64" },
  S: { bg: "#BBDEFB", text: "#1565C0" },
  T: { bg: "#C8E6C9", text: "#2E7D32" },
  U: { bg: "#F8BBD0", text: "#AD1457" },
  V: { bg: "#D1C4E9", text: "#4527A0" },
  W: { bg: "#B2DFDB", text: "#00695C" },
  X: { bg: "#FFAB91", text: "#D84315" },
  Y: { bg: "#BCAAA4", text: "#4E342E" },
  Z: { bg: "#B0BEC5", text: "#37474F" },
};

const ColorAvatar = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?"; // Default if no name provided

  const firstChar = name ? name[0].toUpperCase() : null;
  const { bg, text } = colorMap[firstChar] || colorMap["initial"];

  return (
    <Avatar
      sx={{
        bgcolor: bg,
        color: text,
        fontSize: 15,
        fontWeight: "bold",
        width: 40,
        height: 40,
      }}
    >
      {initials}
    </Avatar>
  );
};

export default ColorAvatar;
