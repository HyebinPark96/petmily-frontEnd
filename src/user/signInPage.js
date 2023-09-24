import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../zustand/store";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import * as router from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PETMILY
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignInPage = () => {
  let sessionStorage = window.sessionStorage;

  const [userIdInput, setUserIdInput] = useState("");
  const [userPasswordInput, setUserPasswordInput] = useState("");

  // 상태를 꺼낸다.
  const userId = useStore((state) => state.userId);

  // 스토어에서 상태를 변경하는 함수를 꺼낸다.
  const updateUserId = useStore((state) => state.updateUserId);

  useEffect(() => {}, [userId]);

  const signIn = () => {
    if (userIdInput === "" || userPasswordInput === "") {
      alert("공백을 제외하고 입력해주세요.");
      return false;
    }

    axios
      .post("/user/signIn", {
        userId: userIdInput,
        userPassword: userPasswordInput,
      })
      .then((response) => {
        if (response.data) {
          updateUserId(userIdInput);

          sessionStorage.setItem("userId", userIdInput);
          sessionStorage.setItem("userPassword", userPasswordInput);

          alert("로그인 되었습니다.");
        } else {
          alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
      })
      .catch((error) => {
        console.log("failed", error);
      });
  };

  const defaultTheme = createTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="id"
              name="id"
              autoComplete="id"
              value={userIdInput || ""}
              onChange={(e) => {
                setUserIdInput(e.target.value);
              }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={userPasswordInput || ""}
              onChange={(e) => {
                setUserPasswordInput(e.target.value);
              }}
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="ID 기억" 
              // label="로그인 상태 유지"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={signIn}
              className="btn-blue btns"
            >
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">
                  <router.Link to="/api/user/signIn">
                    비밀번호를 잊으셨나요?
                  </router.Link>
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  <router.Link to="/api/user/signUp">
                    계정이 없으신가요?
                  </router.Link>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignInPage;
