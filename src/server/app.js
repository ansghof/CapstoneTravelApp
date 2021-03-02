const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");

const geonamesAPIResponse = require("./apiHandler/geonamesAPI.js");
const weatherAPIResponse = require("./apiHandler/weatherAPI.js");
const imageAPIResponse = require("./apiHandler/imageAPI.js");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("dist"));

const tripList = [];

console.log(__dirname);

app.get("/", function(req, res) {
  res.status = 200;
  res.sendFile("dist/index.html");
});

app.get("/weatherdata", async function(req, res) {
  console.log("::GET weatherdata::");

  let geoData = await geonamesAPIResponse({
    city: decodeURIComponent(req.query.city),
    apikey: process.env.GEONAMES_API_KEY
  });

  const latitude = geoData.geonames[0].lat;
  const longitude = geoData.geonames[0].lng;
  console.log("longitude: " + longitude + " latitude: " + latitude);

  let weatherData = await weatherAPIResponse({
    lat: latitude,
    lon: longitude,
    apikey: process.env.WEATHERBIT_API_KEY
  });

  res.status = 200;
  res.send(weatherData);
});

app.get("/cityimage", async function(req, res) {
  console.log("::GET cityimage::");
  let imageData = await imageAPIResponse({
    city: decodeURIComponent(req.query.city),
    apikey: process.env.PIXABAY_API_KEY
  });
  res.status = 200;
  res.send(imageData);
});

app.post("/trip", async function(req, res) {
  console.log("::POST Trip::");
  tripList.push(req.body);
  res.status = 200;
  res.send({
    result: JSON.stringify(tripList)
  });
});

app.get("/trips", function(req, res) {
  console.log("::GET Trips::");
  res.status = 200;
  res.send({
    result: JSON.stringify(tripList)
  });
});

app.delete("/trip", async function(req, res) {
  console.log("::Delete Trip::");
  const idForDeletion = req.query.id;
  if (idForDeletion > tripList.length) {
    res.status = 404;
    res.statusCode = 404;
    console.log(
      "index not found in trip list. Prey to the deity of your choice and retry."
    );
  } else {
    tripList.splice(req.query.id, 1);
    res.status = 200;
    res.statusCode = 200;
  }
  res.send({
    result: JSON.stringify(tripList)
  });
});

module.exports = app;
