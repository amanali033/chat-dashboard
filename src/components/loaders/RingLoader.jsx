import React from "react";

const RingLoader = () => {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(20,110,245,0.15)", // Light blue background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="ring_loader"></span>
    </div>
  );
};

export default RingLoader;
