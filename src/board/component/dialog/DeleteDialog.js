import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteDialog = ({no, setShowCheckPwdForDelete, setOpen}) => {
    
    const [showDeleteDialog, setShowDeleteDialog] = useState(true);

    useEffect(() => {
        setShowCheckPwdForDelete(false);
    }, [])

    const closeDialog = () => {
        setOpen(false);
    }

    const deletePost = () => {
        axios.delete('/board/post/' + no)
        .then((response) => {
            if(response.data) {
                setShowDeleteDialog(false);
                alert('삭제되었습니다.');
                
                setOpen(false); // 부모 리렌더링 시키기 위한 props state 
            } else {
                alert('삭제에 실패하였습니다.');
            }
        });
    } 
    
    return (
        <div>
             <Dialog open={showDeleteDialog} onClose={closeDialog}> 
                <DialogTitle onClick={closeDialog}>
                    게시글 삭제
                </DialogTitle>
                
                <DialogContent>
                    <DialogContentText>정말로 삭제하시겠습니까?</DialogContentText>
                    <DialogActions>
                        <Button onClick={closeDialog} className="cancleBtn">
                            취소
                        </Button>
                        <Button onClick={deletePost} className="deleteBtn">
                            삭제
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog> 
        </div>
    )
}

export default DeleteDialog;

