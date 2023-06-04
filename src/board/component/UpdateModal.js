import React, {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";

const UpdateModal = ({updateModalOpen, post, setFlag}) => {
    const [showUpdateModal, setShowUpdateModal] = useState(updateModalOpen);

    // 모달 끄기 
    const closeModal = () => {
        setFlag(true);
        setShowUpdateModal(false);
    };

    // axios로 보내줄 수정된 post  
    let update_post = ({});
    
    // 첨부파일
    const [file, setFile] = useState();
    
    // 등록, 수정 시 set할 state
    const [subject, setSubject] = useState(post.subject); // 수정 전 post로 초기화
    const [content, setContent] = useState(post.content); // 수정 전 post로 초기화

    // 파일 미리보기 토글
    const [isShowPreviewFile, setIsShowPreviewFile] = useState(true); 

    // 파일 수정 폼 토글
    const [isShowUpdateFileForm, setIsShowUpdateFileForm] = useState(false);
    
    // 게시글 수정
    const updatePost = () => {

        if(subject !== '' && content !== '') { // 지우고 새로 입력했으나 공백 없는 경우 통과
            const formData = new FormData(); // FormData 객체 생성

            if(file !== undefined && file.name !== '') { // 새로운 파일 업로드한 경우

                console.log('새로운 파일 업로드한 경우');
                // 1. 기존 파일 제거or수정하고 새로운 파일 업로드한 경우
                    // 각 상황에 맞게 서버에 상태를 전달하여 그 값에 따라 서버단에서 로컬 파일 수정 및 삭제하기.                
                // 2. 기존 파일 없는 상태에서 새로운 파일 업로드한 경우
                    // 이건 서버에 상태 전달할 필요 없이 바로 업로드
                
                formData.append("originFile", file); // 서버에 파일 저장 위해 파일 자체도 보내주기

                update_post = ({
                    no: post.no,
                    subject: subject, // 현재 폼에 입력되어있는 subject 
                    content: content, // 현재 폼에 입력되어있는 content

                    // 새 파일 업로드이므로 file만 보내주면 백단에서 나머지 파일 컬럼 값 설정 
                    originFile: file.name 
                })

                formData.append("post", new Blob([JSON.stringify(update_post)], {type: "application/json"})); 

            } else { // 새로운 파일 업로드하지 않은 경우 
                console.log(update_post.originFile)
                if(update_post.originFile === undefined) { // 1. 기존 파일 삭제한 경우 
                    console.log('새로운 파일 업로드 안하고 1. 기존 파일 삭제한 경우 ');
                    update_post = ({ 
                        no: post.no,
                        subject: subject, // 현재 폼에 입력되어있는 subject
                        content: content, // 현재 폼에 입력되어있는 content
                        
                        // 파일 관련 컬럼은 update 쿼리 실행까지는 되도록 null이라도 보내주기
                        originFile: null,
                        saveFileDir: null,
                        saveFileName: null
                    })
                } else { // 2. 기존 파일 그대로 두고 수정한 경우
                    console.log('새로운 파일 업로드 안하고 2. 기존 파일 그대로 두고 수정한 경우');
                    update_post = ({
                        no: post.no,
                        subject: subject, // 현재 폼에 입력되어있는 subject로 덮어주기
                        content: content, // 현재 폼에 입력되어있는 content로 덮어주기

                        originFile: post.file,
                        saveFileDir: post.saveFileDir,
                        saveFileName: post.saveFileName
                    })
                }
                formData.append("post", new Blob([JSON.stringify(update_post)], {type: "application/json"})); 
            }

            axios({
                method: 'put',
                url: '/board/post/' + post.no,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                } 
            })
            .then((response) => {
                console.log(response.data);
                if(response.data === true) {
                    closeModal();
                    alert('수정되었습니다.');
                    setFlag(true);
                } else {
                    alert('수정에 실패하였습니다.');
                }
            }); 
        } else { // 공백 있는 경우
            alert('모든 입력사항을 빠짐없이 입력해주세요.');
            return false;
        }
    }

    return (
        <div>
        {/*수정용 모달*/}
            <Modal show={showUpdateModal} onHide={closeModal}> 
                <Modal.Header closeButton onClick={closeModal}>
                    <Modal.Title>게시글 수정</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                    제목
                    <Form.Control type="text" placeholder="제목을 입력해주세요." 
                        defaultValue={post.subject} autoFocus
                        onChange={(e) => {
                            setSubject(e.target.value);
                        }}
                    /><br></br>
                        
                    내용
                    <Form.Control as="textarea" placeholder="내용을 입력해주세요." 
                        defaultValue={post.content} rows={5}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    /><br></br>

                    {/* 기존 첨부파일 있다면 미리보기 + 버튼 누르면 업로드 폼 나오게끔해서 수정할 수 있도록 하기 */}
                    첨부파일
                    <br></br>
                    {/* 2. 첨부파일 없는 경우 */}
                    {
                        post.saveFileDir == null && 
                        <label>[첨부파일이 없습니다]</label>
                    }
                    
                    {/* 파일 추가하기 버튼 */}
                    {
                        post.saveFileDir == null && 
                        <Button className="uploadFileBtn" onClick={() => {
                            setIsShowUpdateFileForm(true);
                        }}>
                            파일업로드
                        </Button>
                    }

                    {/* 1. 첨부파일 있는 경우 */}
                    {
                        post.saveFileDir != null && 
                        isShowPreviewFile &&
                        <img src={post.saveFileDir} className="uploadFile" alt="파일을 불러오는 데 실패하였습니다."></img>
                    }
                    <br></br>
                    {
                        post.saveFileDir != null && 
                        <Button className="updateFileBtn" onClick={() => {
                            setIsShowUpdateFileForm(true);    
                        }}>
                            파일수정
                        </Button>
                    }

                    &nbsp;

                    {
                        post.saveFileDir != null
                        && <Button className="deleteFileBtn" onClick={() => {
                            setIsShowPreviewFile(false); // 파일 미리보기 폼 닫기

                            update_post = ({
                                writer: post.writer,
                                subject: subject, // 현재 폼에 입력되어있는 subject
                                content: content, // 현재 폼에 입력되어있는 content

                                // 파일지우기이므로 파일 관련 컬럼은 null로 set 
                                originFile: null,
                                saveFileDir: null,
                                saveFileName: null
                            });
                        }}>
                            파일지우기
                        </Button>
                    }

                    {/* 파일수정 버튼 클릭 시 파일 업로드 폼 뜨게 */}
                    {
                        isShowUpdateFileForm && 
                        <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Label>파일 업로드</Form.Label>
                        <Form.Control 
                            type="file" size="sm"
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                            }}/>
                        </Form.Group>
                    }


                </Modal.Body>
    
                <Modal.Footer>
                    <Button className="cancleBtn" onClick={closeModal}>
                        취소
                    </Button>
                    <Button className="updateBtn" onClick={() => {
                        updatePost();
                    }}>
                        수정
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default UpdateModal;