//netlify/functions/getAnimalCnt.js
require("dotenv").config();

const axios = require("axios");

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const { bgnde } = payload;

    let abandonmentAnimalCnt = await axios.get(
      `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?_type=json&bgnde=${bgnde}&pageNo=1&numOfRows=10&serviceKey=${process.env.REACT_APP_API_KEY}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(abandonmentAnimalCnt.data.response.body.totalCount),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
