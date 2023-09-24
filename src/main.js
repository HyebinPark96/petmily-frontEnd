import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { SectionsContainer, Section } from "react-fullpage";
import axios from "axios";
import CircularProgress from "@mui/joy/CircularProgress";
import moment from "moment";

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

  useEffect(() => {
    // 추가 데이터를 로드하는 상태로 전환
    setFetching(true);

    axios
      .post(`/.netlify/functions/getAnimalCnt`, {
        bgnde: moment().format("YYYYMMDD"),
      })
      .then((result) => {
        setAbandonmentAnimalCnt(result.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // 추가 데이터 로드 끝
    setFetching(false);
  }, []);

  return (
    <SectionsContainer {...options}>
      {/* 섹션1 */}
      <Section>
        <Box
          sx={{
            bgcolor: "#ffffff",
            height: "100%",
            display: "flex",
          }}
          className="inner items-center justify-center text-5xl"
        >
          <div className="grid gap-x-8 text-center lg:grid-cols-3">
            {fetching === true && <CircularProgress />}

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
              <dt className="text-base leading-7 text-gray-600 w-52">
                오늘 접수된 동물
              </dt>
              <dd className="order-first sm:text-5xl">
                {abandonmentAnimalCnt}
              </dd>
            </div>

          </div>
        </Box>
      </Section>

      {/* 섹션2 */}
      <Section>
        <div style={{ backgroundColor: "#ffffff" }}>ddd</div>
      </Section>
    </SectionsContainer>
  );
};

export default Main;
