import React, { useState, useEffect } from "react";
import axios from "axios";
import useStore from "../zustand/store";

// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogActions } from "@mui/material";

const SignInDialog = () => {
  let sessionStorage = window.sessionStorage;

  const [userIdInput, setUserIdInput] = useState("");
  const [userPasswordInput, setUserPasswordInput] = useState("");

  // 상태를 꺼낸다.
  const userId = useStore((state) => state.userId);
  const open = useStore((state) => state.open);

  // 스토어에서 상태를 변경하는 함수를 꺼낸다.
  const updateUserId = useStore((state) => state.updateUserId);
  const closeDialog = useStore((state) => state.closeDialog);

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
          closeDialog();
        } else {
          alert("아이디 또는 비밀번호가 잘못되었습니다.");
        }
      })
      .catch((error) => {
        console.log("failed", error);
      });
  };

  return (
    <Dialog open={open} onClose={closeDialog} maxWidth="xs">
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">계정 로그인</DialogTitle>

      <DialogContent className="dialog-content .margin-top-10" dividers>
        <TextField
          placeholder="아이디를 입력해주세요."
          type="id"
          value={userIdInput || ""}
          onChange={(e) => {
            setUserIdInput(e.target.value);
          }}
          fullWidth
        />
        <TextField
          placeholder="비밀번호를 입력해주세요."
          type="password"
          value={userPasswordInput || ""}
          onChange={(e) => {
            setUserPasswordInput(e.target.value);
          }}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <button className="btn-gray btns" onClick={closeDialog}>
          취소
        </button>
        <button onClick={signIn} className="btn-blue btns">
          로그인
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default SignInDialog;
