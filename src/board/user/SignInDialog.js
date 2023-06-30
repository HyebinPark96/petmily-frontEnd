import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/Board.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import useStore from '../../zustand/store';

const SignInDialog = () => {

    // 세션의 종류 2가지 (둘 다 저장소의 개념에 불과하다.)
    // 1. localStorage : 사용자가 삭제하지 않는한 정보가 지속되므로 보안에 취약하다.
    // 2. sessionStorage : 브라우저를 닫자마자 저장소가 지워진다. (반휘발성)  
    let sessionStorage = window.sessionStorage;

    // 상태를 꺼낸다.
    const userId = useStore(state => state.userId);

    const [userIdInput, setUserIdInput] = useState('');
    const [userPasswordInput, setUserPasswordInput] = useState('');

    const open = useStore(state => state.open);

    // 스토어에서 상태를 변경하는 함수를 꺼낸다.
    const updateUserId = useStore(state => state.updateUserId);
    const updateOpen = useStore(state => state.updateOpen);
    
    useEffect(() => {
        
    }, [userId])

    const closeDialog = () => {
        updateOpen(false);
    }

    // 로그인 로직 구현
    const signIn = () => {
        // 공백 조건
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
                <Modal show={open} onHide={closeDialog}> 
                    <Modal.Header closeButton onClick={closeDialog}>
                        <Modal.Title>로그인</Modal.Title>
                    </Modal.Header>
        
                    <Modal.Body>
                        아이디
                        <Form.Control type="text"
                            placeholder="아이디를 입력해주세요." autoFocus
                            onChange={(e) => {
                                setUserIdInput(e.target.value);
                            }}
                        /><br></br>
        
                        비밀번호
                        <Form.Control type="password"
                            placeholder="비밀번호를 입력해주세요."
                            onChange={(e) => {
                                setUserPasswordInput(e.target.value);
                            }}
                        /><br></br>
                    </Modal.Body>
        
                    <Modal.Footer>
                        <Button className="cancleBtn" onClick={closeDialog}>
                            취소
                        </Button>
                        <Button onClick={() => {
                            signIn();
                        }}>
                            로그인
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
    ) 
}   

export default SignInDialog;