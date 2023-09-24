import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import useStore from "../../zustand/store";
import MissingAnimalDetailDialog from "./missingAnimalDetailDialog";
import CircularProgress from "@mui/joy/CircularProgress";

const MissingAnimalPage = () => {
  const [missingAnimalList, setMissingAnimalList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state

  const [height, setHeight] = useState(0);

  // 상태를 꺼낸다.
  const open = useStore((state) => state.open);
  const dialogName = useStore((state) => state.dialogName);

  const getMissingAnimalList = async () => {
    // 추가 데이터를 로드하는 상태로 전환
    setFetching(true);

    await axios
      .post(`/.netlify/functions/getMissingAnimalList`, {
        pageNo,
      })
      .then((result) => {
        setMissingAnimalList([
          ...missingAnimalList,
          ...result.data.response.body.items.item,
        ]);
        setPageNo(pageNo + 1);
        setHeight(document.documentElement.scrollHeight);
      })
      .catch((err) => {
        console.log(err);
      });

    // 추가 데이터 로드 끝
    setFetching(false);
  };

  useEffect(() => {
    console.log(height);
  }, [height]);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // 페이지 총 높이
    const scrollHeight = document.documentElement.scrollHeight;

    // 이미 스크롤되어 보이지 않는 구간 높이
    const scrollTop = document.documentElement.scrollTop;

    // 현재 사용자에게 보여지는 페이지 높이
    const clientHeight = document.documentElement.clientHeight;

    // 페이지 끝에 도달했다면 다음 데이터 로드
    if (scrollTop + clientHeight >= scrollHeight - 10 && fetching === false) {
      getMissingAnimalList();
    }
  };

  useEffect(() => {
    // 스크롤 이벤트 등록
    window.addEventListener("scroll", handleScroll);

    // unmount 시 스크롤 이벤트 해제
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  useEffect(() => {
    getMissingAnimalList();
  }, []);

  const openMissingAnimalDetailDialog = useStore(
    (state) => state.openMissingAnimalDetailDialog
  );

  const handleModalOpen = (dialogName, missingAnimalDetail) => {
    openMissingAnimalDetailDialog(dialogName, missingAnimalDetail);
  };

  return (
    <>
      <div className="cards-container" style={{ height: height }}>
        {fetching === true && (
          <CircularProgress
            style={{
              position: "absolute",
              bottom: `10px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%);",
            }}
          />
        )}
        {missingAnimalList.map((missingAnimal, index) => (
          <Card
            key={index}
            className="card"
            onClick={() =>
              handleModalOpen("missingAnimalDetailDialog", missingAnimal)
            }
          >
            <CardActionArea className="card-action-area">
              <div className="card-media-container">
                <CardMedia
                  className="card-media"
                  component="img"
                  src={missingAnimal?.filename}
                  alt="image"
                />
              </div>
              <CardContent className="card-content">
                <Typography gutterBottom variant="h5" component="div">
                  {missingAnimal?.kindCd}
                </Typography>
                <Typography
                  className="notice-date"
                  variant="div"
                  component="div"
                >
                  📢 공고기간: {missingAnimal?.noticeSdt} ~{" "}
                  {missingAnimal?.noticeEdt}
                </Typography>
                <Typography
                  className="happen-place"
                  variant="div"
                  component="div" /* variant="body2" color="text.secondary" */
                >
                  💡 발견장소: {missingAnimal?.happenPlace}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>

      {dialogName === "missingAnimalDetailDialog" && open && (
        <MissingAnimalDetailDialog />
      )}
    </>
  );
};

export default MissingAnimalPage;
