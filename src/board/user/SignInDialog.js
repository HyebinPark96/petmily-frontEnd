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
    const userPassword = useStore(state => state.userPassword);
    const open = useStore(state => state.open);

    // 스토어에서 상태를 변경하는 함수를 꺼낸다.
    const updateOpen = useStore(state => state.updateOpen);
    
    useEffect(() => {
        console.log('signInId : ' + userId);
    }, [userId])

    // 스토어에서 상태를 변경하는 함수를 꺼낸다.
    const updateUserId = useStore(state => state.updateUserId);
    const updateUserPassword = useStore(state => state.updateUserPassword);

    const [inputUserInfoForSignIn, setInputUserInfoForSignIn] = useState({ userId: '', userPassword: '' }); 

    const closeDialog = () => {
        updateOpen(false);
    }

    // 로그인 로직 구현
    const signIn = () => {
        // 공백 조건
        // if(userId === '' || userPassword === '') {
        //     alert('공백을 제외하고 입력해주세요.');
        //     return false;
        // }

        axios.post('/user/signIn', {
            userId: userId,
            userPassword: userPassword,
        })
        .then(response => {
            if(response.data) {

                // updateUserId(response.data.userId);

                // key:value 형태를 갖는다.
                sessionStorage.setItem("userId", inputUserInfoForSignIn.userId);
                sessionStorage.setItem("userPassword", inputUserInfoForSignIn.userPassword);

                // Board 컴포넌트로부터 받아온 state의 값으로 세션에 저장된 id, pwd를 넣어준다.
                updateUserId(sessionStorage.getItem("userId"));
                updateUserPassword(sessionStorage.getItem("userPassword"));

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
                                // updateUserId(e.target.value)
                                setInputUserInfoForSignIn({ ...inputUserInfoForSignIn, userId: e.target.value });
                            }}
                        /><br></br>
        
                        비밀번호
                        <Form.Control type="password"
                            placeholder="비밀번호를 입력해주세요."
                            onChange={(e) => {
                                // updateUserPassword(e.target.value)
                                setInputUserInfoForSignIn({ ...inputUserInfoForSignIn, userPassword: e.target.value });
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