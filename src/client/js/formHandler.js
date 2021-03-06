import { isValidDate } from "./isValidDate";
import { createResultElement } from "./uiElementCreator";
import { Trip } from "./Trip.js";
import { getWeatherData, getCityImageData } from "./serverCommunication";

export { handleSubmit, getCurrentTrip };

const spinner = document.getElementById("spinner");

let currentTrip;

async function handleSubmit(event) {
  console.log("::in handleSubmit::");
  event.preventDefault();
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

function getCurrentTrip() {
  return currentTrip;
}
