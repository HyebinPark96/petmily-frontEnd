//netlify/functions/getPhotos.js
require("dotenv").config();

const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    // const { keyword } = event.queryStringParameters;
    let response = await axios.get(
      `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?_type=json&pageNo=1&numOfRows=10&serviceKey=${process.env.REACT_APP_API_KEY}`,
      {
        params: {
          serviceKey: process.env.REACT_APP_API_KEY,
          numOfRows: 1,
          pageNo: 10,
        },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
