import React, {useState} from 'react';
import './App.css';
import Board from './board/Board';
import Chart from './chart/Chart';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Main from './main';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './topbar';
import NotFound from './notFound';
import IntroducePage from './introduce/introducePage';
import ReservationPage from './reservation/reservationPage';

function App() {
       
  return (
    <>
      <BrowserRouter>
				<Topbar />
				<Routes>
					<Route path="/" element={<main />}></Route>
					<Route path="/api/introduce" element={<IntroducePage />}></Route>
					<Route path="/api/reservation" element={<ReservationPage />}></Route>
					<Route path="/api/board" element={<Board />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
    </>
  )

}


export default App;
