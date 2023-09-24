import React, { useState } from "react";
import axios from "axios";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  Button,
  Link,
  Checkbox,
  TextField,
  Container,
  Avatar,
  Typography,
  Box,
  Grid,
  FormControlLabel,
  CssBaseline,
  Stack,
} from "@mui/material";
import * as router from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

const SignUpPage = () => {
  const [gender, setGender] = useState("");

  const [userIdInput, setUserIdInput] = useState("");
  const [userPasswordInput1, setUserPasswordInput1] = useState("");
  const [userPasswordInput2, setUserPasswordInput2] = useState("");
  const [userNameInput, setUserNameInput] = useState("");

  // 회원가입
  const signUp = () => {
    axios
      .post("/user/signUp", {
        userId: userIdInput,
        userPassword: userPasswordInput1,
        userName: userNameInput,
      })
      .then((response) => {
        if (response.data) {
          alert("회원가입이 완료되었습니다.");
        } else {
          alert("회원가입에 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.log("failed", error);
      });
  };

  const changeGender = (gender) => {
    setGender(gender);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" style={{ width: "550px" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#adb5bd" }}>
            <PersonAddAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            style={{ width: "400px" }}
          >
            <Grid container spacing={1}>
              <Grid item xs={19} className="grid-textField-btn">
                <TextField
                  autoComplete="given-name"
                  name="ID"
                  required
                  fullWidth
                  id="ID"
                  label="ID"
                  style={{ width: "400px" }}
                  autoFocus
                />
                <Button
                  type="button"
                  variant="contained"
                  className="btn-blue"
                  style={{ minWidth: "90px" }}
                >
                  중복확인
                </Button>
              </Grid>
              <Grid item className="textField-410">
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item className="textField-410">
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item className="textField-410">
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item className="textField-410">
                <Stack direction="row" spacing={2}>
                  <Button
                    value="M"
                    className={`gray ${gender === "M" ? "blue-br blue" : ""}`}
                    onClick={(e) => setGender(e.target.value)}
                  >
                    남자
                  </Button>
                  <Button
                    value="W"
                    className={`gray ${gender === "W" ? "blue-br blue" : ""}`}
                    onClick={(e) => setGender(e.target.value)}
                  >
                    여자
                  </Button>
                </Stack>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="공지사항 및 스크랩한 공고의 추가사항 등의 내용이 이메일 또는 문자로 전송될 수 있습니다. 동의하시겠습니까?"
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="btn-blue"
            >
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2">
                  <router.Link to="/api/user/signIn">
                    이미 계정이 있으신가요?
                  </router.Link>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpPage;
