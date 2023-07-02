import React, { useEffect } from 'react'

import * as mui from '@mui/material'; 
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import { Link } from 'react-router-dom';

import useStore from './zustand/store';
import SignUpDialog from './board/user/SignUpDialog';
import SignInDialog from './board/user/SignInDialog';

const pages = ['실종/보호동물', '보호소 구조동물', 'Q&A'];
const url = ['/api/animal/missing/list', '/api/animal/rescue/list', '/api/board']
const userDialogs = ['로그인', '회원가입']
const settings = ['마이페이지', '로그아웃'];

const Topbar = () => {
  let sessionStorage = window.sessionStorage;

  // 상태를 꺼낸다.
  const userId = useStore(state => state.userId);
  const open = useStore(state => state.open);
  const dialogName = useStore(state => state.dialogName);

  // 스토어에서 상태를 변경하는 함수를 꺼낸다.
  const updateUserId = useStore(state => state.updateUserId);
  const openDialog = useStore(state => state.openDialog);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const logout = () => {
    updateUserId('');

    sessionStorage.setItem("userId", "");
    sessionStorage.setItem("userPassword", "");
  };

  const handleModalOpen = (e) => {
    openDialog(e.target.value);
  };

  const handleCloseUserMenu = (value) => {
    if(value === "로그아웃") {
      logout();
    }
  };

  useEffect(() => {

    return () => {}
  }, [userId, dialogName])

  return (
    <>
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
                onClose={handleModalOpen}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <mui.MenuItem key={page} onClick={handleModalOpen}>
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
              {pages.map((page, i) => (
                <Link to={url[i]}>
                  <mui.Button
                    key={page}
                    onClick={handleModalOpen}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </mui.Button>
                </Link>
              ))}
            </mui.Box>

            {
              userId !== ''
              ?
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
                >
                  {settings.map((setting) => (
                    <mui.MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                      <mui.Typography textAlign="center">{setting}</mui.Typography>
                    </mui.MenuItem>
                  ))}
                </mui.Menu>
              </mui.Box>
              :
              <mui.Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                {userDialogs.map((userDialog) => (
                    <mui.Button
                      key={userDialog}
                      value={userDialog}
                      onClick={handleModalOpen}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {userDialog}
                    </mui.Button>
                ))}
              </mui.Box>
            }
         
          </mui.Toolbar>
        </mui.Container> 
      </mui.AppBar>

      {/* 회원가입 모달창 */}
      {
        (dialogName === "회원가입" && open) 
        &&
        <SignUpDialog />
      }

      {/* 로그인 모달창 */}
      {
        (dialogName === "로그인" && sessionStorage.getItem("savedUserId") === null && open)  
        &&
        <SignInDialog />
      }  
    </>
  );
}

export default Topbar