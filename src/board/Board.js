import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import moment from 'moment';

import ReadDialog from './component/dialog/ReadDialog';
import CheckPwdForDeleteDialog from './component/dialog/CheckPwdForDeleteDialog'
import CheckPwdForUpdateDialog from './component/dialog/CheckPwdForUpdateDialog';
import InsertDialog from './component/dialog/InsertDialog';
import SignUpDialog from './user/SignUpDialog';
import SignInDialog from './user/SignInDialog';

import { Form } from 'react-bootstrap';

import MaterialTable from 'material-table';

import * as mui from '@mui/material';
import * as icon1 from '@material-ui/icons'

import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CreateIcon from '@mui/icons-material/Create';
import PhotoIcon from '@mui/icons-material/Photo';
import AddIcon from '@material-ui/icons/Add';

// 아이콘
const tableIcons = {
    Add: forwardRef((props, ref) => <icon1.AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <icon1.Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <icon1.Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <icon1.DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <icon1.ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <icon1.Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <icon1.SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <icon1.FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <icon1.FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <icon1.LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <icon1.ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <icon1.ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <icon1.Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <icon1.Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <icon1.ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <icon1.Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <icon1.ViewColumn {...props} ref={ref} />)
};

const Board = () => {   

    // 모달 공통 state 및 로직  (store로 옮기는 중) 
    const [open, setOpen] = useState(false);
    const [dialogName, setDialogName] = useState("");
    const openDialog = (dialogName) => {
        setOpen(true);
        setDialogName(dialogName);
    }
    const openPostRelatedDialog = (no, dialogName) => {
        setNo(no);
        setOpen(true);
        setDialogName(dialogName);
    }

    // DB에서 가져올 게시글 리스트 (배열) state
    const [boardList, setBoardList] = useState([]);

    // 검색용 state
    const [search_category, setCategory] = useState("subject"); 
    const [search_keyword, setKeyword] = useState(""); 

    // 페이지네이션 state
    const [postCnt, setPostCnt] = useState(0); // 게시글 총 개수
    
    // 등록, 수정 시 set할 state 
    const [no, setNo] = useState(0);

    const getList = () => {
        axios({
            url: '/api/board',
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
            } else { 
                setBoardList([]);
                setPostCnt(response.data.postCnt); 
            }
        });
    }
  
    // 검색 초기화
    const reset = () => {
        setCategory("subject");
        setKeyword("");
        
        axios({
            url: '/board',
            method: 'POST',
            data: {
                search_category: 'subject',
                search_keyword: ''
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
            } else { 
                setBoardList([]);
                setPostCnt(response.data.postCnt); 
            }
        });
    } 

    useEffect(() => {
        getList();
    },[open]) 


    return (
        <div>
            {/* {
                sessionStorage.getItem("savedUserId") === null 
                &&
                <div>
                    <Button variant="outlined" className="signUpBtn" onClick={() => {openDialog("SIGNUP")}}>
                        회원가입
                    </Button>

                    <Button variant="outlined" className="signInBtn" onClick={() => {openDialog("SIGNIN")}}>
                        로그인
                    </Button>
                </div>
            } */}

            {/* {
                sessionStorage.getItem("savedUserId") !== null 
                &&
                <mui.Button onClick={()=>{
                    sessionStorage.clear();
                    setSavedUserId(sessionStorage.getItem("savedUserId"));
                    setSavedUserPwd(sessionStorage.getItem("savedUserPassword"));
                }} className="signOutBtn">로그아웃</mui.Button>
            } */}

            <mui.Stack className="stack" justifyContent="center" alignItems="center" direction="row" spacing={2}>
                <Form.Select className="search_category" value={search_category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                >
                    <option value="subject">제목</option>
                    <option value="content">내용</option>
                    <option value="writer">작성자</option>
                </Form.Select>
                
                <Form.Control type="text" className="search_keyword" placeholder='검색어를 입력하세요.' value={search_keyword}
                     onChange={(e) => {
                        setKeyword(e.target.value);
                    }} 
                />

                <mui.Button variant="contained" className="searchBtn" onClick={() => {
                    // 함수 만들기
                    if(search_keyword === '') {
                        alert('검색어를 입력해주세요.');
                        return false;
                    }
                    getList();
                }}>검색</mui.Button> 
                    
                <mui.Button variant="outlined" className="resetBtn" onClick={reset}>
                    초기화
                </mui.Button> 
            </mui.Stack>
                
            <MaterialTable 
                key={boardList.length}
                title="Q&A"
                icons={tableIcons}
                columns={[
                    { title: '글 번호', field: 'no', width: '10%', headerStyle: {textAlign: 'center'}, cellStyle: {textAlign: 'center'}},
                    { title: '제목', field: 'subject', width: '20%', headerStyle: {textAlign: 'center'}, cellStyle: {textAlign: 'center'}},
                    { title: '작성자', field: 'writer', width: '10%', headerStyle: {textAlign: 'center'}, cellStyle: {textAlign: 'center'}},
                    { title: '작성일자', field: 'writeDate', width: '20%', headerStyle: {textAlign: 'center'}, cellStyle: {textAlign: 'center'},
                        defaultSort: 'desc'
                    },
                    { title: '조회수', field: 'viewCnt', width: '10%', headerStyle: {textAlign: 'center'}, cellStyle: {textAlign: 'center'}, type: 'numeric'},
                ]}
                    
                data={boardList}

                actions={[
                    {
                        icon: CheckIcon,
                        onClick: (event, rowData) => openPostRelatedDialog(rowData.no, "READ")
                    },
                    {
                        icon: DeleteIcon,
                        onClick: (event, rowData) => openPostRelatedDialog(rowData.no, "CHECKPWD_DELETE")
                    },
                    {
                        icon: CreateIcon,
                        onClick: (event, rowData) => openPostRelatedDialog(rowData.no, "CHECKPWD_UPDATE")
                    },
                    {
                        icon: AddIcon,
                        isFreeAction: true,
                        onClick: () => openDialog("INSERT")
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

            {/* 게시글 등록 모달창 */}
            {
                (dialogName === "INSERT" && open) 
                && 
                <InsertDialog open={open} sessionStorage={sessionStorage} setOpen={setOpen} />
            } 
            
            {/* 게시글 상세 모달창 */}
            {
                (dialogName === "READ" && open) 
                && 
                <ReadDialog open={open} no={no} setOpen={setOpen} />
            }

            {/* 게시글 수정을 위한 비밀번호 체크 모달창 */}
            {
                (dialogName === "CHECKPWD_UPDATE" && open) 
                && 
                <CheckPwdForUpdateDialog no={no} setOpen={setOpen} />
            }
        
            {/* 게시글 삭제를 위한 비밀번호 체크 모달창 */}
            {
                (dialogName === "CHECKPWD_DELETE" && open) 
                &&
                <CheckPwdForDeleteDialog open={open} no={no} setOpen={setOpen} />
            }
        </div>
    )
}
export default Board;