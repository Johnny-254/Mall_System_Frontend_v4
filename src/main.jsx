import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../style.css";
// import Experience from "../Experience/Experience.js";

// const experience = new Experience(document.querySelector(".experience-canvas"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
