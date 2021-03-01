export class Trip {
  constructor(startDate, endDate = "", city, country, image, weather = []) {
    this.startDate = startDate;
    this.endDate = startDate;
    this.city = city;
    this.country = country;
    this.image = image;
    this.weather = weather;
  }

  convertToDays(timeInMs) {
    return Math.ceil(timeInMs / (1000 * 60 * 60 * 24));
  }

  // add a weather element to the list if the weather is within the travel time.
  addWeather(weather) {
    const weatherDate = Date.parse(weather.date);
    const startDate = Date.parse(this.startDate);
    const endDate = Date.parse(this.endDate);

    if (weatherDate >= startDate && weatherDate <= endDate) {
      this.weather.push(weather);
      console.log("weather from " + weather.date + " added.");
    } else {
      console.log(
        "weather from " +
          weather.date +
          " not added because it is outside the trip."
      );
    }
  }

  // returns the number of days until the trip starts
  daysToStart() {
    const diff = Date.parse(this.startDate) - Date.now();
    const diffDays = this.convertToDays(diff);
    return diffDays;
  }

  // returns the duration of the trip. A one day trip is assumed if no end date is present or if the dates are equal.
  tripLengthInDays() {
    if (this.endDate === "" || this.startDate === this.endDate) {
      return 1;
    }
    const diff = Date.parse(this.endDate) - Date.parse(this.startDate);
    const diffDays = this.convertToDays(diff);
    return diffDays;
  }
}
