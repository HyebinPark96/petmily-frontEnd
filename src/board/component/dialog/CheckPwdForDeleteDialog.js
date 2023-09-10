import React, { useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DeleteDialog from './deleteDialog';

const CheckPwdForDeleteDialog = ({no, setOpen}) => {

    const [showCheckPwdForDelete, setShowCheckPwdForDelete] = useState(true);

    const closeDialog = () => {
        setOpen(false);
    }

    // 게시글 삭제 모달창 토글 state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // 비밀번호 체크 시 입력한 문자열
    const [inputPwd, setInputPwd] = useState("");

    const handleShowForDeleteDialog = () => {
        axios.post('/checkPwd', {
            no: no, 
            password: inputPwd 
        })
        .then((response) => { 
            if(response.data) {
                setDeleteDialogOpen(true);
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        });
    }

    return (
        <>
            <Dialog open={showCheckPwdForDelete} onClose={closeDialog} animation={false}> 
                <DialogTitle onClick={closeDialog}>게시글 삭제를 위한 비밀번호 확인</DialogTitle>
    
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
                    <Button onClick={closeDialog} className="cancleBtn">
                        취소
                    </Button>
                    <Button onClick={handleShowForDeleteDialog} className="confirmBtn">
                        확인
                    </Button>
                </DialogActions>
            </Dialog>

            {
                deleteDialogOpen
                &&
                <DeleteDialog
                    no={no} 
                    setShowCheckPwdForDelete={setShowCheckPwdForDelete}
                    setOpen={setOpen}
                />
            }
        </>
    )


}

export default CheckPwdForDeleteDialog;
