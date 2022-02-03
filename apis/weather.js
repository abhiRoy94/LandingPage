const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const got = require('got');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

exports.getWeather = async function getWeather(req) {

  // Return object
  let myWeatherObj = {
    weatherPlace: "",
    weatherTemp: "",
    weatherStatus: "",
    weatherImage: ""
  };

  let weatherPlace = req.body.cityName;
  myWeatherObj.weatherPlace = weatherPlace;
  const apiKey = "e3e25755205bb9b1d963a9ad4366cb91";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherPlace + "&appid=" + apiKey + "&units=" + units + "";

  // Get the response
  var response = "";
  try {
    response = await got(url, {json:true});
    let weatherData = response.body;

    myWeatherObj.weatherTemp = weatherData.main.temp;
    myWeatherObj.weatherStatus = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    myWeatherObj.weatherImage = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    //console.log(myWeatherObj);
  }
  catch (error) {
    console.log(error.response.body);
  }

  return myWeatherObj;
}
