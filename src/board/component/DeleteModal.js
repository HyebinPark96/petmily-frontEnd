import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal({deleteModalOpen, no, setFlag}) {
    
    // 게시글 삭제 모달창 토글 state
    const [showDeleteModal, setShowDeleteModal] = useState(deleteModalOpen);

    const closeModal = () => {
        setFlag(true);
        setShowDeleteModal(false);
    }

    // 게시글 삭제
    const deletePost = () => {

        // 삭제 delete
        axios.delete('/board/post/' + no)
        .then((response) => {
            if(response.data === true) {
                setShowDeleteModal(false);
                alert('삭제되었습니다.');
                setFlag(true);
            } else {
                alert('삭제에 실패하였습니다.');
            }
        });
    } 
    
    return (
        <div>
            {/*삭제용 모달*/}
             <Modal show={showDeleteModal} onHide={closeModal}> 
                <Modal.Header closeButton onClick={closeModal}>
                    <Modal.Title>게시글 삭제</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
    
                <Modal.Footer>
                    <Button onClick={closeModal} className="cancleBtn">
                        취소
                    </Button>
                    <Button onClick={deletePost} className="deleteBtn">
                        삭제
                    </Button>
                </Modal.Footer>
            </Modal> 
        </div>
    )
}

export default DeleteModal;

