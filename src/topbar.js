import React from 'react'

import * as mui from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import { Link } from 'react-router-dom';

const pages = ['Introduce ', 'Reservation', 'Q&A'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Topbar = () => {
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

  return (
    <mui.AppBar position="static">
      <mui.Container maxWidth="xl">
        <mui.Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <mui.Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </mui.Typography>

          <mui.Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <mui.IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </mui.IconButton>
            <mui.Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <mui.MenuItem key={page} onClick={handleCloseNavMenu}>
                  <mui.Typography textAlign="center">{page}</mui.Typography>
                </mui.MenuItem>
              ))}
            </mui.Menu>
          </mui.Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <mui.Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </mui.Typography>
          <mui.Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page === 'Q&A' ? '/api/board' : (page === 'Reservation' ? '/api/reservation' : '/api/introduce')}>
                <mui.Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </mui.Button>
              </Link>
            ))}
          </mui.Box>

          <mui.Box sx={{ flexGrow: 0 }}>
            <mui.Tooltip title="Open settings">
              <mui.IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <mui.Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </mui.IconButton>
            </mui.Tooltip>
            <mui.Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <mui.MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <mui.Typography textAlign="center">{setting}</mui.Typography>
                </mui.MenuItem>
              ))}
            </mui.Menu>
          </mui.Box>
        </mui.Toolbar>
      </mui.Container>
    </mui.AppBar>
  );
}

export default Topbar