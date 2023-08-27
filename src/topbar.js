import React, { useEffect } from "react";

import * as mui from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import logo1 from "./style/image/logo/logo1.png";
import logo2 from "./style/image/logo/logo2.png";
import logo3 from "./style/image/logo/logo3.png";

import { Link } from "react-router-dom";

import useStore from "./zustand/store";
import SignUpDialog from "./user/SignUpDialog";
import SignInDialog from "./user/SignInDialog";

const pages = ["실종/보호동물", "Q&A"];
const url = ["/api/animal/missing/list", "/api/board"];
const userDialogs = ["로그인", "회원가입"];
const settings = ["마이페이지", "로그아웃"];

const Topbar = () => {
  let sessionStorage = window.sessionStorage;

  // 상태를 꺼낸다.
  const userId = useStore((state) => state.userId);
  const open = useStore((state) => state.open);
  const dialogName = useStore((state) => state.dialogName);

  // 스토어에서 상태를 변경하는 함수를 꺼낸다.
  const updateUserId = useStore((state) => state.updateUserId);
  const openDialog = useStore((state) => state.openDialog);

  const logout = () => {
    updateUserId("");

    sessionStorage.setItem("userId", "");
    sessionStorage.setItem("userPassword", "");
  };

  const handleModalOpen = (e) => {
    openDialog(e.target.value);
  };

  const handleCloseUserMenu = (value) => {
    if (value === "로그아웃") {
      logout();
    }
  };

  useEffect(() => {
    return () => {};
  }, [userId, dialogName]);

  return (
    <>
      <mui.AppBar position="static" className="app-bar">
        <mui.Container maxWidth="xl">
          <mui.Toolbar>
            <Link to={"/"} style={{ color: "white" }}>
              <div className="child-logo">
                <img src={logo1} className="logo" alt="logo" />
                <mui.Typography className="logo-text">PETMILY</mui.Typography>
              </div>
            </Link>

            <mui.Box>
              <mui.Menu onClose={handleModalOpen}>
                {pages.map((page, idx) => (
                  <mui.MenuItem key={idx} onClick={handleModalOpen}>
                    <mui.Typography>{page}</mui.Typography>
                  </mui.MenuItem>
                ))}
              </mui.Menu>
            </mui.Box>

            <div className="child-pages">
              <mui.Box>
                {pages.map((page, idx) => (
                  <Link to={url[idx]} key={idx}>
                    <input
                      onClick={handleModalOpen}
                      className="page-button"
                      type="button"
                      value={page}
                    />
                  </Link>
                ))}
              </mui.Box>
            </div>

            {userId !== "" ? (
              <div className="child-settings">
                <mui.Box>
                  <mui.Menu>
                    {settings.map((setting, idx) => (
                      <mui.MenuItem key={idx}>
                        <mui.Typography
                          className="setting-text"
                          onClick={() => handleCloseUserMenu(setting)}
                        >
                          {setting}
                        </mui.Typography>
                      </mui.MenuItem>
                    ))}
                  </mui.Menu>
                </mui.Box>
              </div>
            ) : (
              <div className="child-settings">
                <mui.Box>
                  {userDialogs.map((userDialog, idx) => (
                    <mui.Button
                      key={idx}
                      value={userDialog}
                      onClick={handleModalOpen}
                      className="setting-text"
                    >
                      {userDialog}
                    </mui.Button>
                  ))}
                </mui.Box>
              </div>
            )}
          </mui.Toolbar>
        </mui.Container>
      </mui.AppBar>

      {/* 회원가입 모달창 */}
      {dialogName === "회원가입" && open && <SignUpDialog />}

      {/* 로그인 모달창 */}
      {dialogName === "로그인" &&
        sessionStorage.getItem("savedUserId") === null &&
        open && <SignInDialog />}
    </>
  );
};

export default Topbar;
