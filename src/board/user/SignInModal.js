import React, {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/Board.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";

const SignInModal = ({signInModalOpen, setFlag, setSavedUserId, setSavedUserPwd, sessionStorage}) => {

    const [showSignInModal, setShowSignInModal] = useState(signInModalOpen);

    const closeModal = () => {
        setFlag(true);
        setShowSignInModal(false);
    }

    // 로그인 시 사용되는 state
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");

    // 로그인 로직 구현
    const signIn = () => {
        // 공백 조건
        if(userId === '' || userPassword === '') {
            alert('공백을 제외하고 입력해주세요.');
            return false;
        }

        axios.post('/user/signIn', {
            userId: userId,
            userPassword: userPassword,
        })
        .then(response => {
            if(response.data) {

                // key:value 형태를 갖는다.
                sessionStorage.setItem("savedUserId", userId);
                sessionStorage.setItem("savedUserPassword", userPassword);

                // Board 컴포넌트로부터 받아온 state의 값으로 세션에 저장된 id, pwd를 넣어준다.
                setSavedUserId(sessionStorage.getItem("savedUserId"));
                setSavedUserPwd(sessionStorage.getItem("savedUserPassword"));

                setFlag(true)
                alert('로그인 되었습니다.');
                closeModal();
            } else {
                alert('아이디 또는 비밀번호가 잘못되었습니다.');
            }
        }).catch(error => {
            console.log("failed", error);
        })
        
    }
    
    return (
            <div>
                {/*로그인용 모달*/}
                <Modal show={showSignInModal} onHide={closeModal}> 
                    {/* <Header boardTitle="S I G N I N"/> */}
                    <Modal.Header closeButton onClick={closeModal}>
                        <Modal.Title>로그인</Modal.Title>
                    </Modal.Header>
        
                    <Modal.Body>
                        아이디
                        <Form.Control type="text"
                            placeholder="아이디를 입력해주세요." autoFocus
                            onChange={(e) => {
                                setUserId(e.target.value)
                            }}
                        /><br></br>
        
                        비밀번호
                        <Form.Control type="password"
                            placeholder="비밀번호를 입력해주세요."
                            onChange={(e) => {
                                setUserPassword(e.target.value)
                            }}
                        /><br></br>
                    </Modal.Body>
        
                    <Modal.Footer>
                        <Button className="cancleBtn" onClick={closeModal}>
                            취소
                        </Button>
                        <Button className="signInModal_signInBtn" onClick={() => {
                            signIn();
                        }}>
                            로그인
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
    ) 
}   

export default SignInModal;