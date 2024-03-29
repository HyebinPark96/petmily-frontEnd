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
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import moment from "moment";
// import dayjs from "dayjs";

const SignUpPage = () => {
  const defaultTheme = createTheme();
  
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(0);

  const [isCheck, setCheck] = useState(false);

  const movePage = useNavigate();

  // 회원가입
  const signUp = () => {
    if(isDuplicate === true) {
      toast.warn("아이디 중복체크를 해주세요.")
    } else {
      axios
      .post("/user/signUp", {
        userId: userId,
        password: password,
        name: name,
        email: email,
        gender: gender,
      })
      .then((response) => {
        if (response.data === true) {
          alert("회원가입이 완료되었습니다.");
          movePage('/');
        } else {
          toast.warn("회원가입에 실패하였습니다.");
        }
      })
      .catch((error) => {
        console.log("failed", error);
      });
    }
  };

  const [isDuplicate, setDuplicate] = useState(false);

  const checkUserId = () => {
    axios
      .post("/user/checkUserId", {
        userId: userId,
      })
      .then((result) => {
        if (result.data === true) {
          toast.warn("중복된 아이디가 존재합니다.");
          setDuplicate(result.data);
        } else if (result.data === false) {
          toast.info("사용 가능한 아이디입니다.");
          setDuplicate(result.data);
        } else {
          toast.info("오류가 발생했습니다.");
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                  name="userId"
                  required
                  fullWidth
                  id="userId"
                  label="ID"
                  style={{ width: "400px" }}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  autoFocus
                />
                <Button
                  type="button"
                  variant="contained"
                  className="btn-blue"
                  style={{ minWidth: "90px" }}
                  onClick={checkUserId}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </Grid>
              {/* <Grid>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                    <DemoItem label="Uncontrolled calendar">
                      <DateCalendar
                        defaultValue={dayjs('2022-04-17')}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Grid> */}
              <Grid item className="textField-410">
                <Stack direction="row" spacing={2}>
                  <Button
                    value={0}
                    className={`gray ${gender === 0 ? "blue-br blue" : ""}`}
                    onClick={(e) => setGender(parseInt(e.target.value))}
                  >
                    남자
                  </Button>
                  <Button
                    value={1}
                    className={`gray ${gender === 1 ? "blue-br blue" : ""}`}
                    onClick={(e) => setGender(parseInt(e.target.value))}
                  >
                    여자
                  </Button>
                </Stack>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox  
                      color="primary"
                      onChange={(e) => {
                        setCheck(e.target.checked)
                      }} 
                    />
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
              onClick={signUp}
              disabled={isCheck === false ? true : false}
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
