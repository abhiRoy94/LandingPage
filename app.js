// External Packages
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

// Internal Packages
const date = require(__dirname + "/apis/date.js");
const weather = require(__dirname + "/apis/weather.js");

const app = express();

// Using features with Express
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Global API variables
let myWeather = {
  myPlace: "",
  myTemp: "",
  myStatus: "",
  myImage: ""
}

app.get("/", function(req, res) {

  // Get current day and set it in the ejs file
  let myDay = date.getDate();

  // Set object
  const renderObject = {
    currentDay: myDay,
    weatherPlace: myWeather.myPlace,
    weatherTemp: myWeather.myTemp,
    weatherTempStatus: myWeather.myStatus,
    weatherImage: myWeather.myImage
  }

  res.render('main', renderObject);
});

app.post("/", function(req, res) {

  // TODO: CREATE A WAY TO WAIT FOR THE WEATHER API TO COME BACK
  let weatherObj = weather.getWeather(req);

  res.redirect("/");
})


app.listen(3000, function() {
  console.log("Server started on port 3000.");
})
