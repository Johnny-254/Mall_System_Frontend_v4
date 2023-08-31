// import React from 'react'
import { Avatar } from "@mui/material";
import Maleimage from "../assets/img/man.jpg";
import "../assets/css/admin.css";

function Admin() {
  return (
    <div className="admin">
      <div className="sidebar">
        <div className="header">
          <Avatar alt="Admin" src={Maleimage} />
          <h4>Admin Dashboard</h4>
        </div>
        <span></span>
        <div className="side-components">
          <div className="component">Dashboard</div>
          <div className="component">Tenants Profile</div>
          <div className="component">Staff Profile</div>
          <div className="component">Customer Profile</div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
