import Axios from 'axios';
import React from 'react'
import { useEffect } from 'react';

const Introduce = () => {
  useEffect(() => {
    // console.log(process.env.REACT_APP_API_KEY);
    
    Axios.get(`http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?bgnde=20230101&endde=20230627&pageNo=1&numOfRows=10&serviceKey=` + process.env.REACT_APP_API_KEY)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div>introducePage</div>
  )
}

export default Introduce