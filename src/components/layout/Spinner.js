import React from "react";
import spinner from "../img/spinner.gif";

export default function Spinner() {
  return (
    <div
      style={{
        height: "35px",
        width: "35px",
        margin: "auto",
        display: "block"
      }}
    >
      <img src={spinner} alt="spinner" />
    </div>
  );
}
