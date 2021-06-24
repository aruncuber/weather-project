const express = require("express");
const bodyParser = require("body-parser")
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/",(req,res) => {
    let cityName = req.body.city;
    let apiKey = "bd4752e89c77569f33b74b9fbbba00a8";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
  
    https.get(url,(response) => {
         console.log(response.statusCode);
         response.on("data",(data)=>{
            let weatherData =  JSON.parse(data);
            console.log(weatherData);
            let weather = weatherData.main.temp;                   
            let description = weatherData.weather[0].description;
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>You are here in " + cityName + "</h1>");
            res.send();
         });    
    });   
});

app.listen(3000,() => {
    console.log("We are listening you");
})