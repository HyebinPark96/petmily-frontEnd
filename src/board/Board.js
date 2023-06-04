import React, {useState, useEffect, forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Board.css';

import ReadModal from './component/ReadModal';
import CheckPwdForDeleteModal from './user/CheckPwdForDeleteModal'
import CheckPwdForUpdateModal from './user/CheckPwdForUpdateModal';
import InsertModal from './component/InsertModal';
import Header from './component/Header';
import SignUpModal from './user/SignUpModal';
import SignInModal from './user/SignInModal';

import axios from 'axios';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CreateIcon from '@mui/icons-material/Create';
import PhotoIcon from '@mui/icons-material/Photo';

// 아이콘
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Board = () => {   
    // 모달창 노출 여부 state
    const [readModalOpen, setReadModalOpen] = useState(false); // const [modalOpen, setModalOpen] = useState(false)
    // 모달창 노출
    const showReadModal = (no) => {
        setNo(no);
        setReadModalOpen(!readModalOpen); // false => true 처리
    };

    const [checkPwdForDeleteModalOpen, setCheckPwdForDeleteModalOpen] = useState(false);
    const showCheckPwdForDeleteModal = (no) => {
        setNo(no);
        setCheckPwdForDeleteModalOpen(!checkPwdForDeleteModalOpen);
    }

    const [checkPwdForUpdateModalOpen, setCheckPwdForUpdateModalOpen] = useState(false);
    const showCheckPwdForUpdateModal = (no) => {
        setNo(no);
        setCheckPwdForUpdateModalOpen(!checkPwdForUpdateModalOpen);
    }

    const [insertModalOpen, setInsertModalOpen] = useState(false);
    const showInsertModal = () => {
        setInsertModalOpen(!insertModalOpen);
    }

    const [signUpModalOpen, setSignUpModalOpen] = useState(false);
    const showSignUpModal = () => {
        setSignUpModalOpen(!signUpModalOpen);
    }

    const [signInModalOpen, setSignInModalOpen] = useState(false);
    const showSignInModal = () => {
        setSignInModalOpen(!signInModalOpen);
    }

    // 세션의 종류 2가지 (둘 다 저장소의 개념에 불과하다.)
    // 1. localStorage : 사용자가 삭제하지 않는한 정보가 지속되므로 보안에 취약하다.
    // 2. sessionStorage : 브라우저를 닫자마자 저장소가 지워진다. (반휘발성)  
    let sessionStorage = window.sessionStorage;

    // 세션 ID, PWD
    const [savedUserId, setSavedUserId] = useState("");
    const [savedUserPwd, setSavedUserPwd] = useState("");

    // DB에서 가져올 게시글 리스트 (배열) state
    const [boardList, setBoardList] = useState([]);

    // 검색용 state
    const [search_category, setsearch_category] = useState("subject"); 
    const [search_keyword, setsearch_keyword] = useState(""); 

    // 페이지네이션 state
    const [postCnt, setPostCnt] = useState(0); // 게시글 총 개수
    
    // 등록, 수정 시 set할 state 
    const [no, setNo] = useState(0);
 
    // 수정/삭제/게시글 조회/검색/정렬 시 true로 초기화되며 리렌더링됨
    const [flag, setFlag] = useState(false);
  
    // 검색 초기화
    const reset = () => {
        // 검색조건 초기화
        setsearch_category("subject");
        setsearch_keyword("");
        
        axios({
            url: '/board',
            method: 'POST',
            data: {
                search_category: search_category,
                search_keyword: search_keyword
            }
        })
        .then((response) => {
            if(response.data.postCnt > 0) { 
                const data = response.data.result.map((rowData) => (
                    {
                        no: rowData.no,
                        writer: rowData.writer,
                        subject: rowData.subject,
                        content: rowData.content,
                        writeDate: moment(rowData.writeDate).format('YYYY-MM-DD HH:mm:ss'), // 형변환
                        password: rowData.password,
                        viewCnt: rowData.viewCnt,
                        saveFileDir: rowData.saveFileDir
                    }
                ))

                setBoardList(data);
                setPostCnt(response.data.postCnt);

                setFlag(true);
            } else { 
                setBoardList([]); // 빈 배열로 초기화
                setPostCnt(response.data.postCnt);           

                setFlag(true);
            }
        });
    } 

    // useEffect(함수,배열) : 컴포넌트가 화면에 나타났을(마운트)때 자동 실행.
    useEffect(() => {
        axios({
            url: '/board',
            method: 'POST',
            data: {
                search_category: search_category,
                search_keyword: search_keyword
            }
        })
        .then((response) => {
            if(response.data.postCnt > 0) { 
                const data = response.data.result.map((rowData) => (
                    {
                        no: rowData.no,
                        writer: rowData.writer,
                        subject: rowData.subject,
                        content: rowData.content,
                        writeDate: moment(rowData.writeDate).format('YYYY-MM-DD HH:mm:ss'), // 형변환
                        password: rowData.password,
                        viewCnt: rowData.viewCnt,
                        saveFileDir: rowData.saveFileDir
                    }
                ))
                setBoardList(data); 
                setPostCnt(response.data.postCnt); 
                
                // 리렌더링 시 true 상태인 열었던 모달창 state를 false로 초기화 
                setInsertModalOpen(false);
                setReadModalOpen(false);
                setCheckPwdForUpdateModalOpen(false);
                setCheckPwdForDeleteModalOpen(false);
                setSignUpModalOpen(false);
                setSignInModalOpen(false);
                
                setFlag(false);
            } else { // 데이터 0개인 경우
                setBoardList([]); // 빈배열로 초기화
                setPostCnt(response.data.postCnt); // 0개

                setInsertModalOpen(false);
                setReadModalOpen(false);
                setCheckPwdForUpdateModalOpen(false);
                setCheckPwdForDeleteModalOpen(false);
                setSignUpModalOpen(false);
                setSignInModalOpen(false);

                setFlag(false);
            }
        });

    },[flag]) // 해당 state 값 변경 시 리렌더링


    return (
        <div>
            <Button className="insertBtn" onClick={showInsertModal}>
                등록
            </Button>

            <Button className="resetBtn" onClick={reset}>
                초기화
            </Button> 
            
            {sessionStorage.getItem("savedUserId") === null &&
            <Button className="signUpBtn" onClick={() => {showSignUpModal()}}>
                회원가입
             </Button>}

             {sessionStorage.getItem("savedUserId") === null &&
            <Button className="signInBtn" onClick={() => {showSignInModal()}}>
                로그인
            </Button>}

            {sessionStorage.getItem("savedUserId") !== null &&
            <Button onClick={()=>{
                sessionStorage.clear();
                setSavedUserId(sessionStorage.getItem("savedUserId"));
                setSavedUserPwd(sessionStorage.getItem("savedUserPassword"));
            }} className="signOutBtn">로그아웃</Button>}


            <Header boardTitle="B O A R D" />

            
            <div className="boardDiv">
                <MaterialTable key={boardList.length}
                title="게시판"
                icons={tableIcons}

                columns={[
                    { title: '글 번호', field: 'no',
                        cellStyle: {
                            width: "120px",
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center'
                        }
                    },
                    { title: '제목', field: 'subject', 
                        cellStyle: {
                            width: "150px",
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center'
                        }
                    },
                    { title: '작성자', field: 'writer',
                        cellStyle: {
                            width: "150px",
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center'
                        }
                    },
                    { title: '작성일자', field: 'writeDate', 
                        defaultSort: 'desc',
                        cellStyle: {
                            width: "200px",
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center'
                        }
                    },
                    { title: '조회수', field: 'viewCnt', type: 'numeric',
                        cellStyle: {
                            width: "120px",
                            textAlign: 'center'
                        },
                        headerStyle: {
                            textAlign: 'center'
                        }
                    },
                ]}
                
                data={
                    boardList

/*                  
                    // 공식문서의 map 안돌리는 방법 // 무한 렌더링 문제생겨서 일단 보류
                    (query) => {
                        new Promise((resolve, reject) => {
                            axios({
                                  url: '/board',
                                  method: 'POST',
                                  data: {
                                      search_category: search_category,
                                      search_keyword: search_keyword
                                  }
                              })
                              .then(response => response)
                              .then(results => {
                                console.log('test');
                                if(results.data.postCnt > 0) {
                                    console.log('O');
                                    resolve({
                                        data: results.data.result,
                                        // 차후 10 => pageSize로 변경
                                        page: Math.ceil(results.data.postCnt / 10),  
                                        totalCount: results.data.postCnt
                                    })
                                    
                                } else { // 총 데이터 0개인 경우
                                    console.log('X');
                                    resolve({
                                        data: [], // 빈배열로 초기화
                                        page: Math.ceil(results.data.postCnt / 10),  
                                        totalCount: results.data.postCnt
                                    })
    
                                }
                            })
                        })
                    } */
                }

                actions={[
                    {
                        icon: CheckIcon,
                        tooltip: 'Read Post',
                        onClick: (event, rowData) => showReadModal(rowData.no)
                    },
                    {
                        icon: DeleteIcon,
                        tooltip: 'Delete Post',
                        onClick: (event, rowData) => showCheckPwdForDeleteModal(rowData.no)
                    },
                    {
                        icon: CreateIcon,
                        tooltip: 'Update Post',
                        onClick: (event, rowData) => showCheckPwdForUpdateModal(rowData.no)
                    },
                    rowData => ({
                        icon: PhotoIcon,
                        /* tooltip: 'have img', */
                        /* onClick: (event, rowData) => alert(), */
                        disabled: rowData.saveFileDir === null
                    })
                ]}
                
                options={{
                    pageSize: 10,
                    paging: true, 
                    paginationType: "stepped",
                    search: false,
                    sorting: true,
                }}
            />
            </div><br></br>

            {/* 검색 */}
            <Button className="searchBtn" onClick={() => {
                if(search_keyword === '') {
                    alert('검색어를 입력해주세요.');
                    return false;
                }
                setFlag(true); 
            }}
            >검색</Button> 
            <div className="searchDiv">
                <Form.Select className="search_category" value={search_category}
                    onChange={(e) => {
                        setsearch_category(e.target.value);
                    }}
                >
                    <option value="subject">제목</option>
                    <option value="content">내용</option>
                    <option value="writer">작성자</option>
                </Form.Select> &nbsp; 
                
                <Form.Control type="text" className="search_keyword" placeholder='검색어를 입력하세요.' value={search_keyword}
                     onChange={(e) => {
                        setsearch_keyword(e.target.value);
                    }} 
                />
                
                &nbsp;
            </div><br></br>

            {/* 
                아래 모달창들 조건부렌더링
                - flag 보내주는 이유는 등록, 수정, 삭제 시 부모 컴포넌트인 게시판 리렌더링 되기 위함
                - no 보내주는 이유는 해당 게시글에 대해 기능을 만들기 위해
                - ~open 보내주는 이유는 해당 모달창의 open onhide 설정을 위해
            */}

            {/* 게시글 등록 모달창 */}
            {insertModalOpen && 
            <InsertModal insertModalOpen={insertModalOpen} setFlag={setFlag} sessionStorage={sessionStorage} />} 
            
            {/* 게시글 상세 모달창 */}
            {readModalOpen && 
            <ReadModal readModalOpen={readModalOpen} no={no} setFlag={setFlag} />}

            {/* 게시글 수정을 위한 비밀번호 체크 모달창 */}
            {checkPwdForUpdateModalOpen && 
            <CheckPwdForUpdateModal checkPwdForUpdateModalOpen={checkPwdForUpdateModalOpen} no={no} setFlag={setFlag} />}
        
            {/* 게시글 삭제를 위한 비밀번호 체크 모달창 */}
            {checkPwdForDeleteModalOpen &&
            <CheckPwdForDeleteModal checkPwdForDeleteModalOpen={checkPwdForDeleteModalOpen} no={no} setFlag={setFlag} />}
        
            {/* 회원가입 모달창 */}
            {signUpModalOpen &&
            sessionStorage.getItem("savedUserId") === null &&
            <SignUpModal signUpModalOpen={signUpModalOpen} setFlag={setFlag} />}

            {/* 로그인 모달창 */}
            {signInModalOpen &&
            sessionStorage.getItem("savedUserId") === null &&
            <SignInModal signInModalOpen={signInModalOpen} setFlag={setFlag} sessionStorage={sessionStorage} setSavedUserId={setSavedUserId} setSavedUserPwd={setSavedUserPwd} />}  
    
        </div>
    )
}
export default Board;