export { persistTrip, deleteTrip };

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
