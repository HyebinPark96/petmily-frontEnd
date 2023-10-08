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

const MyPage = () => {
  const defaultTheme = createTheme();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(0);

  const movePage = useNavigate();

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
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="btn-blue"
            //   onClick={signUp}
            //   disabled={isCheck === false ? true : false}
            >
              수정
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default MyPage;
