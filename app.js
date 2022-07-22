//jshint esversion: 6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express(); //initialize a new express ap

app.use(bodyParser.urlencoded({extended: true})); //cod necesar pt a parsa prin body ul unui post request


app.get("/", function(req,res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req,res) {
    // console.log(req.body.cityName);
    // console.log("Post request received")

    const query = req.body.cityName;
    const apiKey = "980921cbd2b5008ab2d3bb1ffbd9cbdb";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // console.log(temp);
            // console.log(weatherDescription);
            res.write("<p>The weather is currently " + weatherDescription + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
            res.write("<img src=" + imageURL + ">");
            res.send()
            // const object = {
            //     name: "Andreea",
            //     favouriteFood:"pasta"
            // }
            // console.log(JSON.stringify(object));
        })
    })
    // res.send("Server is up and running.")


})

app.listen(3000, function() {
    console.log("Server is running on port 3000.")
})