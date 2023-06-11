import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import DeleteModal from '../component/DeleteModal';

const CheckPwdForDelete = ({no, setOpen}) => {

    const [showCheckPwdForDelete, setShowCheckPwdForDelete] = useState(true);

    const closeModal = () => {
        setOpen(false);
    }

    // 게시글 삭제 모달창 토글 state
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    // 비밀번호 체크 시 입력한 문자열
    const [inputPwd, setInputPwd] = useState("");

    const handleShowForDeleteModal = () => {
        axios.post('/checkPwd', {
            no: no, 
            password: inputPwd 
        })
        .then((response) => { 
            if(response.data) {
                setDeleteModalOpen(true);
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        });
    }

    return (
        <div>
            <Modal show={showCheckPwdForDelete} onHide={closeModal} animation={false}> 
                <Modal.Header closeButton onClick={closeModal}>
                    <Modal.Title>게시글 삭제를 위한 비밀번호 확인</Modal.Title>
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
                    <Button onClick={closeModal} className="cancleBtn">
                        취소
                    </Button>
                    <Button onClick={handleShowForDeleteModal} className="confirmBtn">
                        확인
                    </Button>
                </Modal.Footer>
            </Modal>

            {
                deleteModalOpen
                &&
                <DeleteModal 
                    no={no} 
                    setShowCheckPwdForDelete={setShowCheckPwdForDelete}
                    setOpen={setOpen}
                />
            }
        </div>
    )


}

export default CheckPwdForDelete;
