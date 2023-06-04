import React, {useEffect, useState} from 'react';
/* import Header from './Header'; */
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/Board.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";

const SignUpModal = ({signUpModalOpen, setFlag}) => {

    const [showSignUpModal, setShowSignUpModal] = useState(signUpModalOpen);

    const closeModal = () => {
        setFlag(true);
        setShowSignUpModal(false);
    }

    // 회원가입시 사용되는 state
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userRrn, setUserRrn] = useState("");
    
    // 주민번호 * 처리 구현 예정
    useEffect(() => {
        setUserRrn(userRrn.toString().replace(userRrn, userRrn.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******")));
    }, [userRrn])

    // 회원가입 로직 구현
    const insertUser = () => {
        // 주민번호 체크
        const ruleForRRN = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-8][0-9]{6}$/;

        if(!ruleForRRN.test(userRrn)) {
            alert("주민등록번호를 형식에 맞게 입력하세요.");
            return false;
        }
        
        axios.post('/user/signUp', {
            userId: userId,
            userPassword: userPassword,
            userName: userName,
            userRrn: userRrn
        })
        .then(response => {
            if(response.data) {
                setFlag(true)
                alert('회원가입이 완료되었습니다.');
                closeModal();
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
                <Modal show={showSignUpModal} onHide={closeModal}> 
                    {/* <Header boardTitle="S I G N U P"/> */}
                    <Modal.Header closeButton onClick={closeModal}>
                        <Modal.Title>회원가입</Modal.Title>
                    </Modal.Header>
        
                    <Modal.Body>
                        아이디
                        <Form.Control type="text"
                            placeholder="아이디를 입력해주세요." autoFocus
                            onChange={(e) => {
                                setUserId(e.target.value);
                            }}
                        /><br></br>
        
                        비밀번호
                        <Form.Control type="password"
                            placeholder="비밀번호를 입력해주세요."
                            onChange={(e) => {
                                setUserPassword(e.target.value);
                            }}
                        /><br></br>
                        
                        이름
                        <Form.Control type="text" placeholder="이름을 입력해주세요."
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        /><br></br>

                        주민등록번호 (Ex. 900101-1234567)
                        <Form.Control type="text" placeholder="주민등록번호를 입력해주세요." value={userRrn/* .toString().replace(userRrn, userRrn.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******"))*/} 
                            // !! 뒷자리 * 처리 아직 미완성
                            onChange={(e) => {
                                setUserRrn(e.target.value);
                                
                                // const masking = e.target.value.toString().replace(e.target.value, e.target.value.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******"));
                                // setMaskingUserRrn(masking);
                            }}
                        /><br></br>
                    </Modal.Body>
        
                    <Modal.Footer>
                        <Button className="cancleBtn" onClick={closeModal}>
                            취소
                        </Button>
                        <Button className="signUpModal_insertBtn" onClick={() => {
                            insertUser();
                        }}>
                            등록
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
    ) 
}

export default SignUpModal;