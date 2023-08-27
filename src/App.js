import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import "./style/content.css";
import "./style/common.css";
import "./style/board.css";
import Board from "./board/Board";
import Topbar from "./topbar";
import NotFound from "./notFound";
import Main from "./main";
import MissingAnimalPage from "./animal/missing/missingAnimalPage";

function App() {
    return (
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            path="/petmily-frontEnd/api/animal/missing/list"
            element={<MissingAnimalPage />}
          ></Route>
          <Route path="/petmily-frontEnd/api/board" element={<Board />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
