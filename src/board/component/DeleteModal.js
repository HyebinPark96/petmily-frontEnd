import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal({no, setShowCheckPwdForDelete, setOpen}) {
    
    const [showDeleteModal, setShowDeleteModal] = useState(true);

    useEffect(() => {
        setShowCheckPwdForDelete(false);
    }, [])

    const closeModal = () => {
        setOpen(false);
    }

    const deletePost = () => {
        axios.delete('/board/post/' + no)
        .then((response) => {
            if(response.data) {
                setShowDeleteModal(false);
                alert('삭제되었습니다.');
                
                setOpen(false); // 부모 리렌더링 시키기 위한 props state 
            } else {
                alert('삭제에 실패하였습니다.');
            }
        });
    } 
    
    return (
        <div>
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

