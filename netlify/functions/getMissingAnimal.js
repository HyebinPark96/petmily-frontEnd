//netlify/functions/getPhotos.js 
require("dotenv").config();

const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const { keyword } = event.queryStringParameters;
    let response = await axios.get(
        `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?_type=json&pageNo=1&numOfRows=10&serviceKey=${process.env.REACT_APP_API_KEY}`,
      {
        headers: { Accept: "application/json", "Accept-Encoding": "identity" },
      }
    );

    let imageURL = response.data.hits;

    return {
      statusCode: 200,
      body: JSON.stringify({ imageURL }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};