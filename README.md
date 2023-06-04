# 📌 React + Spring Boot 게시판 구현  
## 🔨 개발환경
* Java Version 8, Gradle / Spring Boot Version 2.6.7 / React Version 17.0.2
* 사용 라이브러리
  * 테이블 : `material-table 1.69.3`
  * 차트 : `amchart4 4.10.22` 
  * 탭 : `material-ui/core 4.12.3`
## ✅ 기능
  * 탭 메뉴 구현
    * 1번 탭 게시판, 2번 탭 차트
  * 글 리스트
    * 글 번호, 제목, 작성자, 작성 일자
    * 컬럼별 정렬
  * [Modal] 글 등록
    * 입력 항목 : 작성자명, 비밀번호, 제목, 내용
  * [Modal] 글 수정
    * 비밀번호 확인 후 수정 Modal Open
  * [Modal] 글 삭제
    * 비밀번호 확인 후 삭제 Modal Open
        * 삭제 전 사용자 최종 확인 Modal 필요
  * Pagination 구현
  * 글 등록, 수정 시 첨부 파일 추가 기능
    * 첨부 파일 존재 시 글 리스트에서 아이콘 표시
  * 조회수 표시
  * 게시글 검색 기능
  * 차트
    * 컬럼차트 : 일자별 게시글 수
  * 회원기능
    * 회원가입
    * 로그인
    * sessionStorage로 세션 연동 기능 구현
## ✅ 피드백
  * @ControllerAdvice를 이용한 예외처리
  * 마이바티스 여러 if문보다 choose when문으로 코드 줄이기
  * 페이징 처리 : 네트워크 preview/response를 참고하여 페이지당 전체 게시글을 불러오는 방식에서 
                  페이지당 게시글 개수만큼만 들고오기
  * 무분별한 console.log() 대신 개발자도구를 이용한 디버깅
  * 컴포넌트 분리 및 props로 state 넘겨주기
  * state는 상태관리를 위해 필요한 것이므로 일회성 용도는 변수로 관리
  * 가급적 useRef 지양
  * 구조분해할당(spread 등) 학습
