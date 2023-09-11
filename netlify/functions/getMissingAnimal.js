//netlify/functions/getPhotos.js 
require("dotenv").config();

const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    // const { keyword } = event.queryStringParameters;
    let result = await axios.get(
        `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?_type=json&pageNo=1&numOfRows=10&serviceKey=${process.env.REACT_APP_API_KEY}`
    );

    let item = result.data.response.body.itmes.item[0];
    return item;

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};