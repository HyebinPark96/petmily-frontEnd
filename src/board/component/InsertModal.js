import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";

function InsertModal({open, sessionStorage, setOpen}) {

    const closeModal = () => {
        setOpen(false);
    }

    const [writer, setWriter] = useState(""); 
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState();

    const insertPost = () => {
        if(password.length !== 4) {
            alert('4자리의 비밀번호만 입력 가능합니다.');
            return false;
        }

        if(sessionStorage.getItem("savedUserId") === null) {
            if(writer === '') {
                alert('작성자를 입력해주세요.');
                return false;
            }
        }

        if(content === '') {
            alert('내용을 입력해주세요.');
            return false;
        }

        if(password === '') {
            alert('비밀번호를 입력해주세요.');
            return false;
        }
        
        const formData = new FormData(); 

        if(file !== undefined) { // 파일 업로드 했을 경우
            formData.append("originFile", file); 

            let postForInsert = { 
                writer: sessionStorage.getItem("savedUserId") !== null ? sessionStorage.getItem("savedUserId") : writer,
                subject: subject,
                content: content,
                password: password,
                originFile: file.name 
            }

            formData.append("post", new Blob([JSON.stringify(postForInsert)], {type: "application/json"})); 
        } else { // 파일 업로드 안했을 경우
            let postForInsert = { 
                writer: sessionStorage.getItem("savedUserId") !== null ? sessionStorage.getItem("savedUserId") : writer,
                subject: subject,
                content: content,
                password: password 
            }

            formData.append("post", new Blob([JSON.stringify(postForInsert)], {type: "application/json"})); 
        }

        axios({ 
            method: 'post',
            url: '/board/post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            } 
        })
        .then((response) => {
            if(response.data === true) {
                alert('등록되었습니다.');
                closeModal();
            } else {
                alert('등록에 실패하였습니다.');
            }
        }); 
    }

    return (
        <div>
            <Modal show={open} onHide={closeModal}> 
                <Modal.Header closeButton onClick={closeModal}>
                    <Modal.Title>게시글 등록</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                    작성자
                    {sessionStorage.getItem("savedUserId") !== null &&
                    <Form.Control type="text" value={sessionStorage.getItem("savedUserId")} readOnly />}
                    
                    {sessionStorage.getItem("savedUserId") === null &&
                    <Form.Control type="text"
                        placeholder="작성자를 입력해주세요." autoFocus
                        onChange={(e) => {
                            setWriter(e.target.value)
                        }}
                    />}
                    <br></br>
    
                    제목 
                    <Form.Control type="text"
                        placeholder="제목을 입력해주세요." autoFocus
                        onChange={(e) => {
                            setSubject(e.target.value)
                        }}
                    /><br></br>
                    
                    내용 
                    <Form.Control as="textarea" placeholder="내용을 입력해주세요." rows={5} 
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                    /><br></br>

                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>파일 업로드</Form.Label>
                        <Form.Control type="file" size="sm" 
                            onChange={(e) => {
                                // console.log(e.target.files[0]); // 콘솔 찍어보면 List형태
                                setFile(e.target.files[0]);
                            }}/>
                    </Form.Group>
                    
                    비밀번호 
                    <Form.Control type="password"
                        placeholder="비밀번호는 4자리 숫자로 입력해주세요." autoFocus
                        // 길이 및 숫자 조건 걸기
                        onChange={(e) => {
                            if(!/^[0-9].{0,3}$/.test(e.target.value)) {
                                alert('4자리의 숫자만 입력해주세요.');
                                
                                e.target.value = '';
                                return false;
                            } 
                            setPassword(e.target.value);
                        }}
                    /><br></br>
                </Modal.Body>
    
                <Modal.Footer>
                    <Button className="cancleBtn" onClick={closeModal}>
                        취소
                    </Button>
                    <Button className="readModal_insertBtn" onClick={() => {
                        insertPost();
                    }}>
                        등록
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default InsertModal;