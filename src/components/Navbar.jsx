// import React from "react";
import { Link } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <h3>Divine City Mall</h3>
      </div>

      <div className="nav">
        <ul>
          <Link className="link" to={"/"}>
            Home
          </Link>
          <Link className="link" to={"/explore"}>
            Explore
          </Link>
          <Link className="link" to={"/contact"}>
            Contact Us
          </Link>
          <Link className="link" to={"/login"}>
            Log In
            <LoginIcon className="icon" />
          </Link>
          <Link className="link" to={"/signup"}>
            Sign Up
            <PersonIcon className="icon" />
          </Link>
        </ul>
      </div>
      <IconButton className="menu">
        <MenuIcon />
      </IconButton>
    </div>
  );
}

export default Navbar;
