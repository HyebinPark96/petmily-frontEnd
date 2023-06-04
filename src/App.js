import React, {useState} from 'react';
import './App.css';
import Board from './board/Board';
import Chart from './chart/Chart';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

function App() {
  // 탭
  const [tabValue, setTabValue] = useState("board"); // 초기화

  // 특정 탭 콘텐츠 보이게 OR 안보이게
  const [isBoardShow, setIsBoardShow] = useState(true); // 초기화 탭 board 이므로 디폴트 true
  const [isChartShow, setIsChartShow] = useState(false); // 디폴트 false

  // 탭 변경
  function handleChange (event, tabValue) { // 매개변수 event 없으면 에러 
    setTabValue(tabValue); // 선택한 tab의 value로 set하면 UI도 그에따라 변경됨 

    if(tabValue === 'board') { 
        setIsChartShow(false);
        setIsBoardShow(true);
     } else if(tabValue === 'chart') {
        setIsChartShow(true);
        setIsBoardShow(false);       
    }
  }
       
  return (
    <div>
      <TabContext value={tabValue}>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} >
            <Tab label="BOARD" value="board" />
            <Tab label="CHART" value="chart" />
          </TabList>
        </Box>

        <TabPanel value="board">
          {/* <Sort /> */}
          <Board />
        </TabPanel>

        <TabPanel value="chart">
          <Chart />
        </TabPanel>
        
      </TabContext>
    </div>
  )

}


export default App;
