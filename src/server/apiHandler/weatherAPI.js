const fetch = require("node-fetch");
let baseUrl = "https://api.weatherbit.io/v2.0/forecast/daily?";

let response = async function getResponse(data = {}) {
  const returnValue = await fetch(
    baseUrl + "key=" + data.apikey + "&lat=" + data.lat + "&lon=" + data.lon,
    {
      method: "GET"
    }
  );
  const returnJson = await returnValue.json();
  return returnJson;
};

module.exports = response;
