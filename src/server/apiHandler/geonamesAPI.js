const fetch = require("node-fetch");
let baseUrl = "http://api.geonames.org/search?";

let response = async function getResponse(data = {}) {
  const returnValue = await fetch(
    baseUrl +
      "username=" +
      data.apikey +
      "&name_equals=" +
      data.city +
      "&lang=en&type=json&maxRows=1",
    {
      method: "GET"
    }
  );
  const returnJson = await returnValue.json();
  return returnJson;
};

module.exports = response;
