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

    // 모달 공통 state 및 로직 
    const [open, setOpen] = useState(false);
    const [modalName, setModalName] = useState("");
    const openModal = (modalName) => {
        setOpen(true);
        setModalName(modalName);
    }
    const openPostRelatedModal = (no, modalName) => {
        setNo(no);
        setOpen(true);
        setModalName(modalName);
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
                        writeDate: moment(rowData.writeDate).format('YYYY-MM-DD HH:mm:ss'), 
                        password: rowData.password,
                        viewCnt: rowData.viewCnt,
                        saveFileDir: rowData.saveFileDir
                    }
                ))
                setBoardList(data); 
                setPostCnt(response.data.postCnt); 
            } else { // 데이터 0개인 경우
                setBoardList([]); // 빈배열로 초기화
                setPostCnt(response.data.postCnt); // 0개
            }
        });
    },[open]) 


    return (
        <div>
            <Button className="insertBtn" onClick={() => openModal("INSERT")}>
                등록
            </Button>

            <Button className="resetBtn" onClick={reset}>
                초기화
            </Button> 
            
            {sessionStorage.getItem("savedUserId") === null &&
            <Button className="signUpBtn" onClick={() => {openModal("SIGNUP")}}>
                회원가입
             </Button>}

             {sessionStorage.getItem("savedUserId") === null &&
            <Button className="signInBtn" onClick={() => {openModal("SIGNIN")}}>
                로그인
            </Button>}

            {sessionStorage.getItem("savedUserId") !== null &&
            <Button onClick={()=>{
                sessionStorage.clear();
                setSavedUserId(sessionStorage.getItem("savedUserId"));
                setSavedUserPwd(sessionStorage.getItem("savedUserPassword"));
            }} className="signOutBtn">로그아웃</Button>}

            <Header boardTitle="게시판" />
            
            <div className="boardDiv">
                <MaterialTable 
                    key={boardList.length}
                    // title="게시판"
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
                        onClick: (event, rowData) => openPostRelatedModal(rowData.no, "READ")
                    },
                    {
                        icon: DeleteIcon,
                        tooltip: 'Delete Post',
                        onClick: (event, rowData) => openPostRelatedModal(rowData.no, "CHECKPWD_DELETE")
                    },
                    {
                        icon: CreateIcon,
                        tooltip: 'Update Post',
                        onClick: (event, rowData) => openPostRelatedModal(rowData.no, "CHECKPWD_UPDATE")
                    },
                    rowData => ({
                        icon: PhotoIcon,
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

            <Button className="searchBtn" onClick={() => {
                if(search_keyword === '') {
                    alert('검색어를 입력해주세요.');
                    return false;
                }
                setFlag(true); 
            }}>검색</Button> 

            <div className="searchDiv">
                <Form.Select className="search_category" value={search_category}
                    onChange={(e) => {
                        setsearch_category(e.target.value);
                    }}
                >
                    <option value="subject">제목</option>
                    <option value="content">내용</option>
                    <option value="writer">작성자</option>
                </Form.Select>
                
                <Form.Control type="text" className="search_keyword" placeholder='검색어를 입력하세요.' value={search_keyword}
                     onChange={(e) => {
                        setsearch_keyword(e.target.value);
                    }} 
                />
            </div><br></br>

            {/* 게시글 등록 모달창 */}
            {
                (modalName === "INSERT" && open) 
                && 
                <InsertModal open={open} sessionStorage={sessionStorage} setOpen={setOpen} />
            } 
            
            {/* 게시글 상세 모달창 */}
            {
                (modalName === "READ" && open) 
                && 
                <ReadModal open={open} no={no} setOpen={setOpen} />
            }

            {/* 게시글 수정을 위한 비밀번호 체크 모달창 */}
            {
                (modalName === "CHECKPWD_UPDATE" && open) 
                && 
                <CheckPwdForUpdateModal no={no} setOpen={setOpen} />
            }
        
            {/* 게시글 삭제를 위한 비밀번호 체크 모달창 */}
            {
                (modalName === "CHECKPWD_DELETE" && open) 
                &&
                <CheckPwdForDeleteModal open={open} no={no} setOpen={setOpen} />
            }
        
            {/* 회원가입 모달창 */}
            {
                (modalName === "SIGNUP" && open) 
                &&
                <SignUpModal open={open} setOpen={setOpen} />
            }

            {/* 로그인 모달창 */}
            {
                (modalName === "SIGNIN" && sessionStorage.getItem("savedUserId") === null && open)  
                &&
                <SignInModal 
                    sessionStorage={sessionStorage} 
                    setSavedUserId={setSavedUserId} 
                    setSavedUserPwd={setSavedUserPwd} 
                    setOpen={setOpen} 
                />
            }  
    
        </div>
    )
}
export default Board;