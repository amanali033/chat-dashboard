import { CircularProgress } from "@mui/material";
import React from "react";

function ButtonLoader({ color = "white" }) {
  return (
    <>
      <CircularProgress
        size="20px"
        thickness={4}
        color={color}
        style={{
          animationDuration: "2s",
          //  marginLeft: "8px"
        }}
      />{" "}
    </>
  );
}

export default ButtonLoader;
