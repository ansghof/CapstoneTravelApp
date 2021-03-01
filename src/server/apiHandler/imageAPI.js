const fetch = require("node-fetch");
let baseUrl = "https://pixabay.com/api/?";

let response = async function getResponse(data = {}) {
  console.log(data);
  const url =
    baseUrl +
    "key=" +
    encodeURIComponent(data.apikey) +
    "&q=" +
    encodeURIComponent(data.city) +
    "&image_type=photo&pretty=true&category=places";
  console.log(url);
  const returnValue = await fetch(url, {
    method: "GET"
  });
  const returnJson = await returnValue.json();
  return returnJson;
};

module.exports = response;
