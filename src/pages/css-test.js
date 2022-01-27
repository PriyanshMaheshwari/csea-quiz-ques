import { Typography } from "@mui/material";
import React from "react";

const colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];

const TestPage = () => {
  return (
    <div
      style={{
        margin: "300px 50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <div style={{ width: "500px", height: "300px", marginLeft: "300px" }}>
        <Typography variant="h5" textAlign="center">
          flexWrap:"nowrap"
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          {colors.map((item) => (
            <div
              style={{
                background: `${item}`,
                textAlign: "center",
                height: "100px",
                width: "100px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: "500px", height: "300px", marginLeft: "300px" }}>
        <Typography variant="h5" textAlign="center">
          flexWrap:"wrap-reverse"
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap-reverse",
          }}
        >
          {colors.map((item) => (
            <div
              style={{
                background: `${item}`,
                textAlign: "center",
                height: "100px",
                width: "100px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: "500px", height: "300px", marginLeft: "300px" }}>
        <Typography variant="h5" textAlign="center">
          flexWrap:"wrap"
        </Typography>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {colors.map((item) => (
            <div
              style={{
                background: `${item}`,
                textAlign: "center",
                height: "100px",
                width: "100px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* <div style={{ width: "500px", height: "300px", marginLeft:'300px' }}>
        <Typography variant="h5" textAlign="center">
          flexWrap:"wrap"
        </Typography>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "" }}
        >
          {colors.map((item) => (
            <div
              style={{
                background: `${item}`,
                textAlign: "center",
                height: "100px",
                width: "100px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default TestPage;
