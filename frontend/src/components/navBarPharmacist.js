import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountIcon from '@mui/icons-material/AccountCircle'

const pages = [
  "Medicines",
  "Sales",
  "Sales Report",
  "Monthly Sales Report",
  "Add Medicine",
  "Chat with Patient",
  "Chat with Doctor",
  "Change Password",
];
const settings = ["Logout"];
const username = localStorage.getItem("username");

function ResponsiveAppBar({button}) {
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserMenu = async (text) => {
    switch (text) {
      default: {
        const response = await fetch("/account/logout", { method: "GET" });
        const json = await response.json();
        if (response.ok) {
          //setToken();
          localStorage.setItem("token", "");
          localStorage.setItem("role", "");
          localStorage.setItem("username", "");
          navigate("/");
        }
      }
    }
  };

  const [walletBalance, setWalletBalance] = useState(0);

  const getWalletBalance = (username) => {
    fetch("http://localhost:8001/pharmacist/medicines/getWalletBalance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Return the JSON response
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log(data.data.walletBalance);
        //walletBalance = data.data.walletBalance;

        setWalletBalance(data.data);
      })
      .catch((error) => console.error("Error fetching wallet balance:", error));
  };

  getWalletBalance(username);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <IconButton
            size="large"
            aria-label="back"
            onClick={() => navigate(-1)} // Add this line
            color="inherit"
          >
            <ArrowBackIcon style={{position: 'absolute', marginRight:'20px'}}/>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                //fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: '20px'
            }}
            style={{marginRight:'15px'}}
          >
            El7a2ni Pharmacy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, marginLeft: '-10px' }}>
            {pages.map((page) => {
              let url = "/pharmacist/medicines/";
              if (page === "Medicines") {
                url = "/pharmacist/medicines/";
              } else if (page === "Sales") {
                url = "/pharmacist/medicines/sales/";
              } else if (page === "Sales Report") {
                url = "/pharmacist/medicines/salesreport/";
                } else if (page === "Monthly Sales Report") {
                url = "/pharmacist/medicines/monthlysalesreport/";
                }else if (page === "Add Medicine") {
                url = "/pharmacist/medicines/addmedicine/";
                }
                else if (page === "Chat with Patient") {
                url = "/PatientList/";
                }
                else if (page === "Chat with Doctor") {
                url = "/DoctorList";
                } else if (page === "Change Password") {
                    url = "/ChangePassword/";
                }
              return (
                <Button
                  key={page}
                  onClick={() => navigate(url)}
                  sx={{ my: 2, color: "black", display: "block" }}
                  style={{fontSize:'14px', margin:'5px', marginTop: '20px', marginLeft:'1px',marginRight:'-5px',
                  backgroundColor: button === page? 'white' : 'transparent'}}
                >
                  {page}
                </Button>
              );
            })}
          </Box>
          <Box>
            <div style={{ marginLeft: "-75px", marginTop: "5px", width:10 }}>
              <Typography
                variant="body1"
                style={{ marginTop: "15px", marginRight: "-20px" }}
              >
                Wallet Balance: {walletBalance}
              </Typography>
            </div>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountIcon style={{color: 'white'}}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               {settings.map((text) => (
                <MenuItem key={text} onClick={() => handleUserMenu(text)}>
                  <Typography textAlign="center">{text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
