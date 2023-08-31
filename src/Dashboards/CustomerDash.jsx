import { useState } from "react";

import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";

import Experience from "../components/Experience";
import Parking from "../components/Parking";
import Stores from "../components/Stores";
import { useEffect } from "react";
import { RingLoader } from "react-spinners";

function CustomerDash() {
  const tabs = [
    { label: "Experience", content: <Experience /> },
    { label: "Parking", content: <Parking /> },
    { label: "Stores", content: <Stores /> },
  ];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    {
      text: "Home",
      icon: <HomeIcon sx={{ color: "#ff6600" }} />,
      route: "/CustomerDash",
    },
    {
      text: "Profile",
      icon: <AccountBoxIcon sx={{ color: "#ff6600" }} />,
      route: "/profile",
    },
    {
      text: "Settings",
      icon: <SettingsIcon sx={{ color: "#ff6600" }} />,
      route: "/settings",
    },
  ];

  const handleChange = (e, newValue) => {
    setLoading(true); // Set loading to true when changing tabs
    setValue(newValue);
  };

  // Effect to handle loading state when content is ready
  useEffect(() => {
    setLoading(false); // Set loading to false when content is ready
  }, [value]);

  return (
    <div className="dash">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} className="box">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs.map((tab, index) => (
              <Tab
                className="tabs"
                key={index}
                label={tab.label}
                {...allyProps(index)}
                sx={{ color: value === index ? "orange" : "inherit" }}
              />
            ))}
          </Tabs>
          <Button onClick={toggleDrawer}>
            <MenuIcon />
          </Button>
        </Box>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <List sx={{ width: 200 }} className="drawer-list">
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={toggleDrawer}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box sx={{ p: 3 }}>
          {loading ? (
            <RingLoader color="#ff6600" loading={loading} className="loader" />
          ) : (
            tabs[value].content
          )}
        </Box>
      </Box>
    </div>
  );
}

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default CustomerDash;
