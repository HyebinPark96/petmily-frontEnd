import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './style/content.css';
import Board from './board/Board';
import Topbar from './topbar';
import NotFound from './notFound';
import Main from './main';
import MissingAnimalPage from './animal/missing/missingAnimalPage';
import RescueAnimalPage from './animal/rescue/rescueAnimalPage';

function App() {
       
  return (
    <BrowserRouter>
		<Topbar />
		<Routes>
			<Route path="/" element={<Main />}></Route>
			<Route path="/api/animal/missing/list" element={<MissingAnimalPage />}></Route>
			<Route path="/api/animal/rescue/list" element={<RescueAnimalPage />}></Route>
			<Route path="/api/board" element={<Board />}></Route>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
	</BrowserRouter>
  )

}


export default App;
