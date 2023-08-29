import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import useStore from '../zustand/store';

const SignUpDialog = () => {

    // 상태를 꺼낸다.
    const open = useStore(state => state.open);

    // 스토어에서 상태를 변경하는 함수를 꺼낸다.
    const closeDialog = useStore(state => state.closeDialog);

    // 회원가입시 사용되는 state
    const [userIdInput, setUserIdInput] = useState("");
    const [userPasswordInput, setUserPasswordInput] = useState("");
    const [userNameInput, setUserNameInput] = useState("");
    const [userRrnInput, setUserRrnInput] = useState("");
    
    // 주민번호 * 처리 구현 예정
    useEffect(() => {
        setUserRrnInput(userRrnInput.toString().replace(userRrnInput, userRrnInput.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******")));
    }, [userRrnInput])

    // 회원가입 로직 구현
    const insertUser = () => {
        // 주민번호 체크
        const ruleForRRN = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-8][0-9]{6}$/;

        if(!ruleForRRN.test(userRrnInput)) {
            alert("주민등록번호를 형식에 맞게 입력하세요.");
            return false;
        }
        
        axios.post('/user/signUp', {
            userId: userIdInput,
            userPassword: userPasswordInput,
            userName: userNameInput,
            userRrn: userRrnInput
        })
        .then(response => {
            if(response.data) {
                alert('회원가입이 완료되었습니다.');
                closeDialog();
            } else {
                alert('회원가입에 실패하였습니다.');
            }
        }).catch(error => {
            console.log("failed", error);
        })
        
    }
    
    return (
            <div>
                {/*회원가입용 모달*/}
                <Modal show={open} onHide={closeDialog}> 
                    <Modal.Header closeButton onClick={closeDialog}>
                        <Modal.Title>회원가입</Modal.Title>
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
                        
                        이름
                        <Form.Control type="text" placeholder="이름을 입력해주세요."
                            onChange={(e) => {
                                setUserNameInput(e.target.value);
                            }}
                        /><br></br>

                        주민등록번호 (Ex. 900101-1234567)
                        <Form.Control type="text" placeholder="주민등록번호를 입력해주세요." value={userRrnInput/* .toString().replace(userRrn, userRrn.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******"))*/} 
                            // !! 뒷자리 * 처리 아직 미완성
                            onChange={(e) => {
                                setUserRrnInput(e.target.value);
                                
                                // const masking = e.target.value.toString().replace(e.target.value, e.target.value.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******"));
                                // setMaskingUserRrn(masking);
                            }}
                        /><br></br>
                    </Modal.Body>
        
                    <Modal.Footer>
                        <button className="btn-gray btns" onClick={closeDialog}>
                            취소
                        </button>
                        <button 
                            onClick={() => {
                                insertUser();
                            }}
                            className="btn-blue btns"
                        >
                            등록
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
    ) 
}

export default SignUpDialog;