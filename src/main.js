import React, { useState, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import { SectionsContainer, Section } from "react-fullpage";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import moment from "moment";
import adoptCat from './style/image/main/adopt-cat.jpg'
import adoptDog from './style/image/main/adopt-dog.jpg'

let options = {
  anchors: ["sectionOne", "sectionTwo"],
};

const Main = () => {
  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state

  // const stats = [
  //   // { id: 1, name: "구조된 동물", value: "44" },
  //   { id: 1, name: "유기된 동물" },
  //   { id: 2, name: "보호종료된 동물" },
  // ];

  // const [adoptAnimalCnt, setAdoptAnimalCnt] = useState(0); // 입양 동물 수
  const [abandonmentAnimalCnt, setAbandonmentAnimalCnt] = useState(0); // 오늘 보호된(유기된) 동물 수
  // const [protectionEndAnimalCnt, setProtectionEndAnimalCnt] = useState(0); // 오늘 보호종료되는 동물 수

  useLayoutEffect(() => {
    // 추가 데이터를 로드하는 상태로 전환
    setFetching(true);

    axios
      .post(`/.netlify/functions/getAnimalCnt`, {
        bgnde: moment().format("YYYYMMDD"),
      })
      .then((result) => {
        setAbandonmentAnimalCnt(result.data);
        // 추가 데이터 로드 끝
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SectionsContainer {...options}>
      {/* 섹션1 */}
      <Section>
        {/* {fetching === true && (
        <CircularProgress style={{ position: "absolute", left: '50%', top: '50%' }} />
      )} */}

        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "calc(100vh - 100px)",
            display: "flex",
          }}
          className="items-center justify-center text-5xl"
          style={{ position: "relative" }}
        >
          {fetching === true && (
            <CircularProgress
              style={{
                position: "absolute",
                left: "49%",
                top: "49%",
                transform: "translate(-50%, -50%);",
              }}
            />
          )}

          {fetching === false && (
            <div className="gap-x-8 text-center">
              {/* {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col">
                <dt className="text-base leading-7 text-gray-600 w-52">
                  {stat.name}
                </dt>
                <dd className="order-first sm:text-5xl">
                  {abandonmentAnimalCnt}
                </dd>
              </div>
            ))} */}

              <div className="flex flex-col">
                <dt className="text-base text-gray-600 ">오늘 접수된 동물</dt>
                <dd>{abandonmentAnimalCnt}</dd>
              </div>
            </div>
          )}
        </Box>
      </Section>

      {/* 섹션2 */}
      <Section>
        <div style={{ backgroundColor: "#ffffff" }}>
          <img src={adoptCat} style={{ width: "100%", height: "100vh"}} />
        </div>
      </Section>
    </SectionsContainer>
  );
};

export default Main;
