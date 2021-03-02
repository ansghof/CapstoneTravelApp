export { createResultElement };
import { Trip } from "./Trip.js";
import { persistTrip, deleteTrip, loadTripList } from "./serverCommunication";
import { getCurrentTrip } from "./formHandler";
import "regenerator-runtime/runtime";

// this function creates one UI-element for a trip and adds it to the dom.
function createResultElement(trip, existing, id) {
  // get rid of an existing search result if something new was searched.
  if (!existing && document.getElementById("result") !== null) {
    removeCurrentTripFromUi();
  }
  let resultDiv = document.createElement("div");

  // existing trips from the server get their id as a suffix, otherwise, id is only called result without a number
  if (existing) {
    resultDiv.setAttribute("id", "result" + id);
    resultDiv.classList.add("trip", "transparent-box", "persistedtrip");
  } else {
    resultDiv.setAttribute("id", "result");
    resultDiv.classList.add("trip", "transparent-box");
  }

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
    button.setAttribute("id", id);
    button.textContent = "Remove";
    button.onclick = removeTrip;
  } else {
    button.classList.add("add-button");
    button.textContent = "Add";
    button.onclick = addTrip;
  }

  tripDestinationDiv.appendChild(button);
  if (existing) {
    document.querySelector("#persisted-trips-area").appendChild(resultDiv);
  } else {
    document.querySelector("#result-area").appendChild(resultDiv);
  }
}

async function addTrip(event) {
  console.log("add trip");
  let tripList = await persistTrip(getCurrentTrip());
  let trips = tripList.result;
  trips = JSON.parse(trips);
  rebuildTripsUiSection(trips, true);
}

async function removeTrip(event) {
  console.log("remove trip");
  console.log(event);
  let tripList = await deleteTrip(event.target.id);
  let trips = tripList.result;
  trips = JSON.parse(trips);
  rebuildTripsUiSection(trips, false);
}

function removeCurrentTripFromUi() {
  let currentElement = document.getElementById("result");

  if (currentElement) {
    console.log("remove current trip");
    currentElement.remove();
  }
}

function removeAllTripsFromUi() {
  let trips = document.getElementsByClassName("persistedtrip");
  console.log(trips.length + " trips to delete");
  if (trips.length > 0) {
    for (let i = trips.length - 1; i >= 0; i--) {
      console.log("removing trip... " + i);
      trips[i].remove();
    }
  }
}

function rebuildTripsUiSection(trips, preserveCurrentTrip) {
  if (preserveCurrentTrip) {
    removeCurrentTripFromUi();
  }
  removeAllTripsFromUi();
  for (let i = 0; i < trips.length; i++) {
    let trip1 = Object.assign(new Trip(), trips[i]);
    createResultElement(trip1, true, i);
  }
}

window.addEventListener("load", async event => {
  console.log("delete all, load from scratch");
  const json = await loadTripList();
  let trips = json.result;
  console.log(trips);
  trips = JSON.parse(trips);
  removeAllTripsFromUi();
  for (let i = 0; i < trips.length; i++) {
    let trip1 = Object.assign(new Trip(), trips[i]);
    createResultElement(trip1, true, i);
  }
});
