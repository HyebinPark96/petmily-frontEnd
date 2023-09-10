import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import "./style/content.css";
import "./style/common.css";
// import "./style/board.css";
import 'react-toastify/dist/ReactToastify.css';
import Board from "./board/board";
import Topbar from "./topbar";
import NotFound from "./notFound";
import Main from "./main";
import MissingAnimalPage from "./animal/missing/missingAnimalPage";
import SignUpPage from "./user/signUpPage";
import SignInPage from './user/signInPage';

function App() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Topbar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/api/animal/missing/list"
            element={<MissingAnimalPage />}
          ></Route>
          <Route path="/api/board" element={<Board />}></Route>
          <Route path="/api/user/signUp" element={<SignUpPage />}></Route>
          <Route path="/api/user/signIn" element={<SignInPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
