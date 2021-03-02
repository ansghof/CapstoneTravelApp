# Travel App

The travel app allows users to input a destination and a date. It will provide a scenic image of the location together with the weather conditions at arrival.
All trips are assumed to be one day length.

## Usage

Enter a location in the text field, choose a date from the date picker. Hit search.

## How it works

The app consists of two parts. A client and a server.

### Server

The server of this app is responsible for the api calls to retrieve the geolocation of the destination, the weather there and also the image.
For this, the server offers the endpoints `/weather` and `/cityimage`. When weather is called, the server will first request the geolocation,
then the weather and will return it to the caller.

#### Installation

The server requires three API keys which have to be located in the `.env` file in the root of the project. A template for this file is checked into
the repository. `cp .env.template .env`and add your API-keys into the file.

#### Startup

Run `node src/server/server.js` from the project root to start the server. It will run at [localhost](http://127.0.0.1:8081) by default.

### Client

The client is the webpage which is used to plan trips.

#### Startup

The client can be started from the dev server using `npm run build-dev`. It will automatically start the browser and load the page. Make sure the server
is running. If the server doesn't run, CORS errors will show up in the browser's dev tools.

## Tests

Testing was done for several functions, including those of the Trip-class. To run the tests, use `npm run test`.
