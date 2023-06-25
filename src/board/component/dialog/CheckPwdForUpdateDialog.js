import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import UpdateDialog from './UpdateDialog';

const CheckPwdForUpdateDialog = ({no, setOpen}) => {

    const [showCheckPwdForUpdate, setShowCheckPwdForUpdate] = useState(true);

    const closeDialog = () => {
        setOpen(false);
    }

    // 게시글 수정 모달창 토글 state
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    // 비밀번호 체크 시 입력한 문자열
    const [inputPwd, setInputPwd] = useState("");
    
    const handleShowForUpdateDialog = () => {
        axios.post('/checkPwd', {
            no: no, 
            password: inputPwd
        })
        .then((response) => {
            if(response.data) {
                setUpdateDialogOpen(true); 
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        });
    }

    return (
        <>
             <Dialog open={showCheckPwdForUpdate} onClose={closeDialog}> 
                <DialogTitle>
                    게시글 수정을 위한 비밀번호 확인
                </DialogTitle>
    
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="비밀번호를 입력해주세요"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setInputPwd(e.target.value);
                        }}
                    />
                </DialogContent>
    
                <DialogActions>
                    <Button className="cancleBtn" onClick={closeDialog}>
                        취소
                    </Button>
                    <Button className="confirmBtn" onClick={handleShowForUpdateDialog}>
                        확인
                    </Button>
                </DialogActions>
            </Dialog> 

            {
                updateDialogOpen
                &&
                <UpdateDialog 
                    setShowCheckPwdForUpdate={setShowCheckPwdForUpdate} 
                    setOpen={setOpen}
                    no={no}
                />
            }
        </>
    ) 
}

export default CheckPwdForUpdateDialog;