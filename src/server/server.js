const app = require("./app");

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
  console.log("Server listening on port 8081!");
});
