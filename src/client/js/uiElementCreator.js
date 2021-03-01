export { createResultElement };
import { Trip } from "./Trip.js";

// this function creates one UI-element for a trip and adds it to the dom.
// todo: add event handler for add or delete.
function createResultElement(trip, existing) {
  let resultDiv = document.createElement("div");

  resultDiv.setAttribute("id", "result");
  resultDiv.classList.add("trip", "transparent-box");

  let tripDestinationCountryDiv = document.createElement("div");
  tripDestinationCountryDiv.classList.add("trip-destination-country");
  resultDiv.appendChild(tripDestinationCountryDiv);

  let tripDestinationImageDiv = document.createElement("div");
  tripDestinationImageDiv.classList.add("trip-destination-background");
  tripDestinationImageDiv.setAttribute(
    "style",
    "background-image: url(" + trip.image + ");"
  );

  let tripDestinationDiv = document.createElement("div");
  tripDestinationDiv.classList.add("trip-destination");
  tripDestinationDiv.textContent =
    "Your trip to " + trip.city + " starts in " + trip.daysToStart() + " days";
  tripDestinationImageDiv.appendChild(tripDestinationDiv);

  resultDiv.appendChild(tripDestinationImageDiv);

  let weatherIcon = document.createElement("div");

  // todo: so far, only 1 day trips. So only one day weather... If that changes, add more weather icons
  if (trip.weather.length > 0) {
    weatherIcon.classList.add("weatherIcon");
    weatherIcon.setAttribute(
      "style",
      "background-image: url(" + trip.weather[0].icon + ");"
    );
    weatherIcon.textContent = trip.weather[0].temperature + "°C";
  } else {
    weatherIcon.textContent =
      "Trip is still " +
      trip.daysToStart() +
      " days in the future. Weather will be displayd 16 days before start.";
  }
  tripDestinationImageDiv.appendChild(weatherIcon);
  let tripDestinationTemperatureDiv = document.createElement("div");
  tripDestinationTemperatureDiv.classList.add("trip-destination-temperature");
  tripDestinationTemperatureDiv.textValue = trip.temperature;
  resultDiv.appendChild(tripDestinationTemperatureDiv);

  let button = document.createElement("div");
  if (existing) {
    button.classList.add("remove-button");
    button.textContent = "Remove";
  } else {
    button.classList.add("add-button");
    button.textContent = "Add";
  }

  tripDestinationDiv.appendChild(button);

  document.querySelector("#result-area").appendChild(resultDiv);
}
