const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', function (req, res) {
    const query = req.body.cityName;
    const apiKey = '58b39bedc7483dffdfe160f7294c5718';
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function (response) {
        // console.log(response.statusCode);

        response.on('data', function (data) {
            const weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write('<p>the weather is currently ' + desc + '</p>');
            res.write('<h1>the temprature in ' + query + ' is ' + temp + ' degrees Celcius</h1>');
            res.write('<img src="http://openweathermap.org/img/wn/' + icon + '@2x.png" />')

            res.send();
        });
    })
})



app.listen(3000, function () {
    console.log('server starts with port 3000.');
})