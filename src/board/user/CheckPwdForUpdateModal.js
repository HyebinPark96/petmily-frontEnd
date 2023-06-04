import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import UpdateModal from '../component/UpdateModal';

const CheckPwdForUpdateModal = ({checkPwdForUpdateModalOpen, no, setFlag}) => {

    // 게시글 수정을 위한 비밀번호 체크 모달창 토글 state
    const [showCheckPwdForUpdateModal, setShowCheckPwdForUpdateModal] = useState(checkPwdForUpdateModalOpen);

    const closeModal = () => {
        setFlag(true); 
        setShowCheckPwdForUpdateModal(false);
    }

    // 게시글 수정 모달창 토글 state
    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    // 비밀번호 체크 시 입력한 문자열
    const [inputPwd, setInputPwd] = useState("");
    
    // DB에서 가져올 단일 게시글 state
    const [post, setPost] = useState();

    // 비밀번호 체크 시 일치하면 => 수정용 모달 열기
    const handleShowForUpdateModal = () => {

        axios.post('/checkPwd', {
            // pwd 체크위해 해당 no과 입력한 pwd 보내주기 
            no: no, // 매개변수로 받아온 no
            password: inputPwd // 입력한 pwd
        })
        .then((response) => {
            if(response.data !== '') { // 비밀번호 틀리면 컨트롤러에서 null 리턴
                setPost(response.data); // 수정된 post 담김
                
                setShowCheckPwdForUpdateModal(false); // 비밀번호 체크 모달창 닫기
                setUpdateModalOpen(true); // true 처리하면 조건부 렌더링에서 참이되어 렌더링 
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        });
    }


    return (
        <div>
            {/*게시글 수정을 위한 비밀번호 체크 모달창*/}
             <Modal show={showCheckPwdForUpdateModal} onHide={closeModal}> 
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

            {updateModalOpen &&
            <UpdateModal updateModalOpen={updateModalOpen} post={post} setFlag={setFlag} />}
        </div>
    ) 
}

export default CheckPwdForUpdateModal;