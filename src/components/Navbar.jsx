import * as React from "react";
import { NavLink } from "react-router-dom";
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
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { axiosInstance } from "../api/axiosInstance";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { auth, setAuth, loading } = React.useContext(AuthContext);

  // Wait until auth is resolved
  if (loading) {
    return null;
  }
  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/api/v1/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setAuth(null);
    } catch (err) {
      // console.error(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  // Navigation pages
  const pages = [
    { name: "Home", path: "/home" },
    { name: "Registration", path: "/registration" },
    auth
      ? { name: "Logout", action: handleLogout }
      : { name: "Login", path: "/login" },
  ];

  // User menu
  const settings = [
    { name: "Profile", path: "/profile" },
    { name: "Dashboard", path: "/dashboard" },
    auth
      ? { name: "Logout", action: handleLogout }
      : { name: "Login", path: "/login" },
  ];

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO (Desktop) */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            component={NavLink}
            to="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          {/* MOBILE MENU */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
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
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={page.path ? NavLink : "li"}
                  to={page.path}
                  onClick={() => {
                    handleCloseNavMenu();
                    page.action && page.action();
                  }}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* LOGO (Mobile) */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            component={NavLink}
            to="/home"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          {/* DESKTOP MENU */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={page.path ? NavLink : "button"}
                to={page.path}
                onClick={() => {
                  handleCloseNavMenu();
                  page.action && page.action();
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {/* DESKTOP ONLY WELCOME TEXT */}
          {auth?.name && (
            <Typography
              variant="body1"
              sx={{
                display: { xs: "none", md: "block" }, // hidden on xs/sm, visible md+
                mr: 2,
                color: "white",
              }}
            >
              {`Welcome ${auth.name}`}
            </Typography>
          )}
          {/* USER AVATAR */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={auth?.name}>
                  {auth?.name ? auth?.name[0].toUpperCase() : "U"}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  component={setting.path ? NavLink : "li"}
                  to={setting.path}
                  onClick={() => {
                    handleCloseUserMenu();
                    setting.action && setting.action();
                  }}
                >
                  {setting.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
