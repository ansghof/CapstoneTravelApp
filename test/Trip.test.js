import { Trip } from "../src/client/js/Trip";

const fourDays = 1000 * 60 * 60 * 24 * 4;

// #region helper functions
function createTrip(startDate, imagelink, weatherdata) {
  let trip = new Trip();
  trip.startDate = startDate;
  trip.endDate = startDate; // set to enddate if no enddate is specified.
  trip.image = imagelink;
  trip.city = weatherdata.city;
  trip.country = weatherdata.country;
  trip.addWeather({
    temperature: weatherdata.temp,
    date: weatherdata.date,
    icon: "asdf.png"
  });
  return trip;
}

function getDateString(date) {
  var dateObject = new Date(date);
  var year = dateObject.getUTCFullYear();
  var month =
    dateObject.getUTCMonth() + 1 < 10
      ? "0" + (dateObject.getUTCMonth() + 1)
      : dateObject.getUTCMonth() + 1;
  var day =
    dateObject.getUTCDate() < 10
      ? "0" + dateObject.getUTCDate()
      : dateObject.getUTCDate();
  return year + "-" + month + "-" + day;
}
// #endregion

test("Trip date should be 4 days in the future", () => {
  let inFourDays = Date.now() + fourDays;
  let trip = new Trip(
    getDateString(inFourDays),
    "http://www.example.com/asdf.png",
    {
      city: "Berlin",
      country: "Germany",
      temp: "15.0",
      date: "2022-02-02"
    }
  );
  expect(trip.daysToStart()).toBe(4);
});

test("Trip length without end date should be one", () => {
  let inFourDays = Date.now() + fourDays;
  let trip = new Trip(
    getDateString(inFourDays),
    "http://www.example.com/asdf.png",
    {
      city: "Berlin",
      country: "Germany",
      temp: "15.0",
      date: "2022-02-02"
    }
  );
  expect(trip.tripLengthInDays()).toBe(1);
});

test("Trip length should be 12", () => {
  let inFourDays = Date.now() + fourDays;
  let inSixteenDays = inFourDays + 3 * fourDays;

  let trip = new Trip(
    getDateString(inFourDays),
    "http://www.example.com/asdf.png",
    {
      city: "Berlin",
      country: "Germany",
      temp: "15.0",
      date: "2022-02-02"
    }
  );
  trip.endDate = getDateString(inSixteenDays);

  expect(trip.tripLengthInDays()).toBe(12);
});
