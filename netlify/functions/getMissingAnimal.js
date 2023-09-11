//netlify/functions/getMissingAnimal.js
require("dotenv").config();

const axios = require("axios");

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body)
    const { pageNo } = payload
    let response = await axios.get(
      `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?_type=json&pageNo=${pageNo}&numOfRows=10&serviceKey=${process.env.REACT_APP_API_KEY}`
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
