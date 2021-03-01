import { isValidDate } from "./isValidDate";
import { createResultElement } from "./uiElementCreator";
import { Trip } from "./Trip.js";
export { handleSubmit };

const spinner = document.getElementById("spinner");

let currentTrip;
let tripList = [];

async function getWeatherData(data) {
  console.log("::in getWeatherData::");
  console.log(data.city);
  const response = await fetch(
    "http://localhost:8081/weatherdata?city=" + encodeURIComponent(data.city),
    {
      method: "GET",
      credentials: "same-origin",
      mode: "cors"
    }
  );
  const json = response.json();

  return json;
}

async function getCityImageData(data) {
  console.log("::in getCityImageData::");
  console.log(data);
  const response = await fetch(
    "http://localhost:8081/cityimage?city=" + encodeURIComponent(data.city),
    {
      method: "GET",
      credentials: "same-origin",
      mode: "cors"
    }
  );
  const json = response.json();

  return json;
}

async function persistTrip(event) {
  console.log("::persisting trip::");
}

async function handleSubmit(event) {
  console.log("::in handleSubmit::");
  event.preventDefault();
  // resultText.innerHTML = "";
  let startDate = document.getElementById("start-date").value;
  let destination = document.getElementById("destination").value;
  console.log(destination);
  let dateCheckResult = isValidDate(startDate);
  if (!dateCheckResult.valid) {
    alert(dateCheckResult.message);
    return;
  }
  spinner.style.visibility = "visible";
  let postData = {
    city: destination
  };
  const weatherData = await getWeatherData(postData);

  const imageData = await getCityImageData(postData);

  const newTrip = createTrip(startDate, imageData, weatherData);
  currentTrip = newTrip;

  spinner.style.visibility = "hidden";
  //todo: remove old current trip from ui to replace it by the new one.
  createResultElement(currentTrip, false);
}

function createTrip(startDate, imageData, weatherData) {
  let trip = new Trip();
  trip.startDate = startDate;
  // todo: if end date is added, change to real end date field value
  trip.endDate = startDate;
  trip.image = imageData.hits[0].webformatURL;
  trip.city = weatherData.city_name;
  trip.country = weatherData.country_code;
  for (let weather of weatherData.data) {
    trip.addWeather({
      temperature: weather.high_temp,
      date: weather.datetime,
      icon:
        "https://www.weatherbit.io/static/img/icons/" +
        weather.weather.icon +
        ".png"
    });
  }
  return trip;
}
