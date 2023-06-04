import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import CheckPwdForUpdateModal from "../user/CheckPwdForUpdateModal";
import CheckPwdForDeleteModal from "../user/CheckPwdForDeleteModal";

function ReadModal({readModalOpen, no, setFlag}) {

    const [showReadModal, setShowReadModal] = useState(readModalOpen);

    const [checkPwdForDeleteModalOpen, setCheckPwdForDeleteModalOpen] = useState(false);

    const [checkPwdForUpdateModalOpen, setCheckPwdForUpdateModalOpen] = useState(false);

    // DB에서 가져올 단일 게시글 state
    const [post, setPost] = useState({});

    useEffect(() => {
        axios.get('/board/post/' + no)
        .then((response) => {
            setPost(response.data);
        })
    }, [])


    // 모달 끄기 
    function closeModal() {
        setFlag(true);
        setShowReadModal(false);
    } 

    return (
        <div>
            <Modal show={showReadModal} onHide={closeModal} animation={false}>
                <Modal.Header closeButton onClick={closeModal}>
                    <Modal.Title>게시글 읽기</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    작성자
                    <Form.Control 
                        type="text" 
                        readOnly 
                        defaultValue={post.writer} />
                    <br></br>
                    작성일자
                    <Form.Control
                        type="text"
                        readOnly
                        defaultValue={moment(post.writeDate).format('YYYY-MM-DD HH:mm:ss')} 
                    />
                    <br></br>
                    제목
                    <Form.Control
                        type="text"
                        readOnly
                        defaultValue={post.subject} 
                    />
                    <br></br>
                    내용
                    <Form.Control
                        as="textarea"
                        readOnly
                        defaultValue={post.content}
                        rows={5}
                    />
                    <br></br>
                    첨부파일
                    {/* 1. 첨부파일 있는 경우 */}
                    {post.saveFileDir != null && 
                    (
                        <img
                        src={post.saveFileDir}
                        className="uploadFile"
                        alt="파일을 불러오는 데 실패하였습니다."
                        ></img>
                    )} 
                    <br></br>
                    {/* 2. 첨부파일 없는 경우 */}
                    {post.saveFileDir == null && 
                    (
                        <label>[첨부파일이 없습니다]</label>
                    )}
                </Modal.Body>

                <Modal.Footer>
                     <Button className="updateBtn" onClick={() =>{
                        setCheckPwdForUpdateModalOpen(true);
                        setShowReadModal(false);
                        }}
                    >수정
                    </Button>
                    <Button className="deleteBtn" onClick={() => {
                        setCheckPwdForDeleteModalOpen(true);
                        setShowReadModal(false);
                        }}
                    >삭제
                    </Button> 
                </Modal.Footer>
            </Modal>

            {/* 게시글 수정을 위한 비밀번호 체크 모달창 */}
            {checkPwdForUpdateModalOpen &&
            <CheckPwdForUpdateModal checkPwdForUpdateModalOpen={checkPwdForUpdateModalOpen} no={no} setFlag={setFlag} />}

            {/* 게시글 삭제를 위한 비밀번호 체크 모달창 */}
            {checkPwdForDeleteModalOpen &&
            <CheckPwdForDeleteModal checkPwdForDeleteModalOpen={checkPwdForDeleteModalOpen} no={no} setFlag={setFlag} />}
        </div>
    );
}
export default ReadModal;