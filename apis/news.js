const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const got = require('got');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

exports.getNews = async function getNews(req, query) {

  const apiKey = "79fd01a998f0f57529155cb2f3b89581";
  const url = "http://api.mediastack.com/v1/news?access_key=" + apiKey + "&categories=" + query + "&languages=en";

  // Get the response
  var response = "";
  try {
    response = await got(url, {json:true});

  }
  catch (error) {
    console.log(error.response.body);
  }

  return response.body.data;
}
