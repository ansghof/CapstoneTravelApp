export {
  persistTrip,
  deleteTrip,
  loadTripList,
  getWeatherData,
  getCityImageData
};

async function persistTrip(trip) {
  console.log(trip);
  const response = await fetch("http://localhost:8081/trip", {
    method: "POST",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(trip)
  });

  const json = await response.json();
  return json;
}

async function deleteTrip(id) {
  console.log(id);
  const response = await fetch("http://localhost:8081/trip?id=" + id, {
    method: "DELETE",
    credentials: "same-origin",
    mode: "cors"
  });

  const json = await response.json();
  return json;
}

async function loadTripList() {
  console.log("loading triplist from server");
  const tripList = await fetch("http://localhost:8081/trips");
  const json = await tripList.json();
  return json;
}

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
