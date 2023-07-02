import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/Board.css';
import useStore from '../../zustand/store';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const SignInDialog = () => {

    // 세션의 종류 2가지 (둘 다 저장소의 개념에 불과하다.)
    // 1. localStorage : 사용자가 삭제하지 않는한 정보가 지속되므로 보안에 취약하다.
    // 2. sessionStorage : 브라우저를 닫자마자 저장소가 지워진다. (반휘발성)  
    let sessionStorage = window.sessionStorage;

    const [userIdInput, setUserIdInput] = useState('');
    const [userPasswordInput, setUserPasswordInput] = useState('');

    // 상태를 꺼낸다.
    const userId = useStore(state => state.userId);
    const open = useStore(state => state.open);
    
    // 스토어에서 상태를 변경하는 함수를 꺼낸다.
    const updateUserId = useStore(state => state.updateUserId);
    const closeDialog = useStore(state => state.closeDialog);
    
    useEffect(() => {
        
    }, [userId])

    const StyledInput = {
        borderRadius: '8px',
    }
      
    const signIn = () => {
        if(userIdInput === '' || userPasswordInput === '') {
            alert('공백을 제외하고 입력해주세요.');
            return false;
        }

        axios.post('/user/signIn', {
            userId: userIdInput,
            userPassword: userPasswordInput,
        })
        .then(response => {
            if(response.data) {
                updateUserId(userIdInput);

                sessionStorage.setItem("userId", userIdInput);
                sessionStorage.setItem("userPassword", userPasswordInput);

                alert('로그인 되었습니다.');
                closeDialog();
            } else {
                alert('아이디 또는 비밀번호가 잘못되었습니다.');
            }
        }).catch(error => {
            console.log("failed", error);
        })
        
    }
    
    return (
        <div>
            <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
                <DialogTitle>계정 로그인</DialogTitle>
            
                <DialogContent>
                    <div>
                        <TextField
                            id="outlined-required"
                            placeholder='아이디를 입력해주세요.'
                            type="id"
                            style={StyledInput}
                            value={userIdInput || ''}
                            onChange={(e) => {
                                setUserIdInput(e.target.value);
                            }}
                            fullWidth
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-required"
                            placeholder='비밀번호를 입력해주세요.'
                            type="password"
                            style={StyledInput}
                            value={userPasswordInput || ''}
                            onChange={(e) => {
                                setUserPasswordInput(e.target.value);
                            }}
                            fullWidth
                        />
                    </div>
                </DialogContent>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 20px 0' }}>
                    <Button 
                        variant="contained" 
                        style={{ width: '550.4px', height: '56px' }}
                        onClick={signIn}
                    >
                        로그인
                    </Button>
                </div>

            </Dialog>
        </div>
    )
}   

export default SignInDialog;