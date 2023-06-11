import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import UpdateModal from '../component/UpdateModal';

const CheckPwdForUpdateModal = ({no, setOpen}) => {

    const [showCheckPwdForUpdate, setShowCheckPwdForUpdate] = useState(true);

    const closeModal = () => {
        setOpen(false);
    }

    // 게시글 수정 모달창 토글 state
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    // 비밀번호 체크 시 입력한 문자열
    const [inputPwd, setInputPwd] = useState("");
    
    const handleShowForUpdateModal = () => {
        axios.post('/checkPwd', {
            no: no, 
            password: inputPwd
        })
        .then((response) => {
            if(response.data) {
                setUpdateModalOpen(true); 
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        });
    }

    return (
        <div>
             <Modal show={showCheckPwdForUpdate} onHide={closeModal}> 
                <Modal.Header closeButton onClick={closeModal}>
                    <Modal.Title>게시글 수정을 위한 비밀번호 확인</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                    비밀번호
                    <Form.Control type="password" placeholder="비밀번호를 입력해주세요." 
                        onChange={(e) => {
                            setInputPwd(e.target.value);
                        }}
                    />
                </Modal.Body>
    
                <Modal.Footer>
                    <Button className="cancleBtn" onClick={closeModal}>
                        취소
                    </Button>
                    <Button className="confirmBtn" onClick={handleShowForUpdateModal}>
                        확인
                    </Button>
                </Modal.Footer>
            </Modal> 

            {
                updateModalOpen
                &&
                <UpdateModal 
                    setShowCheckPwdForUpdate={setShowCheckPwdForUpdate} 
                    setOpen={setOpen}
                    no={no}
                />
            }
        </div>
    ) 
}

export default CheckPwdForUpdateModal;