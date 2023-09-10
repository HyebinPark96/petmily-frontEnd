import React, { useEffect } from "react";

import * as mui from "@mui/material";
import logo1 from "./style/image/logo/logo1.png";

import { Link } from "react-router-dom";

import useStore from "./zustand/store";
// import SignUpDialog from "./user/signUpDialog";
// import SignInDialog from "./user/signInDialog";

const categoryPages = ["실종/보호동물", "Q&A"];
const userPages = ["로그인", "회원가입"];
const settingsPages = ["마이페이지", "로그아웃"];

const categoryUrl = ["/api/animal/missing/list", "/api/board"];
const userUrl = ["/api/user/signIn", "/api/user/signUp"];
const settingsUrl = ["/api/user/myPage", "/api/user/signOut"];

const Topbar = () => {
  let sessionStorage = window.sessionStorage;

  // 상태를 꺼낸다.
  const userId = useStore((state) => state.userId);
  const dialogName = useStore((state) => state.dialogName);

  // 스토어에서 상태를 변경하는 함수를 꺼낸다.
  const updateUserId = useStore((state) => state.updateUserId);

  const logout = () => {
    updateUserId("");

    sessionStorage.setItem("userId", "");
    sessionStorage.setItem("userPassword", "");
  };

  const handleCloseUserMenu = (value) => {
    if (value === "로그아웃") {
      logout();
    }
  };

  useEffect(() => {}, [userId, dialogName]);

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

            <div className="child-pages">
              <mui.Box>
                {categoryPages.map((page, idx) => (
                  <Link to={categoryUrl[idx]} key={idx}>
                    <input className="page-button" type="button" value={page} />
                  </Link>
                ))}
              </mui.Box>
            </div>

            {userId !== "" ? (
              <div className="child-settings">
                <mui.Box>
                  <mui.Menu>
                    {settingsPages.map((page, idx) => (
                      <mui.MenuItem key={idx}>
                        <mui.Typography
                          className="setting-text"
                          onClick={() => handleCloseUserMenu(page)}
                        >
                          {page}
                        </mui.Typography>
                      </mui.MenuItem>
                    ))}
                  </mui.Menu>
                </mui.Box>
              </div>
            ) : (
              <div className="child-settings">
                <mui.Box>
                  {userPages.map((page, idx) => (
                    <Link to={userUrl[idx]} key={idx}>
                      <mui.Button
                        key={idx}
                        value={page}
                        className="setting-text"
                      >
                        {page}
                      </mui.Button>
                    </Link>
                  ))}
                </mui.Box>
              </div>
            )}
          </mui.Toolbar>
        </mui.Container>
      </mui.AppBar>
    </>
  );
};

export default Topbar;
