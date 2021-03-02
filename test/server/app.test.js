import "regenerator-runtime/runtime";
import app from "../../src/server/app.js";
import "babel-polyfill";

const fetch = require("node-fetch");
const request = require("supertest");
const expectedResult = { data: { something: "nothing" } };

test("It should response the GET method", done => {
  request(app)
    .get("/trips")
    .then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
});

test("ID out of range should return 404", done => {
  request(app)
    .delete("/trip?id=666")
    .then(response => {
      expect(response.statusCode).toBe(404);
      done();
    });
});
