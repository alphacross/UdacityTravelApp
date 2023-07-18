var path = require('path')
const express = require('express')
const cors = require('cors');
const portNo = 8081;
const dotenv = require('dotenv');
dotenv.config();

const app = express()

app.use(express.static('dist'))
app.use(cors());
app.use(express.json());

async function getWeather(lat, long){
    var apiUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?days=1&lat=' + lat + '&lon='+ long + '&key=' + process.env.WEATHER_API_KEY;
    const res = await fetch(apiUrl);
    var data = await res.json();
    return data;
}

async function getImage(keyword){
    var apiUrl = `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${keyword.replace(/ /g, '+')}&image_type=photo&pretty=true`;
    const res = await fetch(apiUrl);
    var data = await res.json();
    if(data.hits.length > 0){
        return data.hits[0].webformatURL;
    }
    return null;
}

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(portNo, function () {
    console.log(`Example app listening on port ${portNo}!`)
})

app.get('/')

app.get('/getCountry', async function(req, res){
    const getCountryRes = await fetch(`http://api.geonames.org/searchJSON?username=${process.env.GEO_USERNAME}&name_equals=${req.query.name}`);
    var result = await getCountryRes.json();

    res.send(result.geonames[0]);
})

app.get('/getWeather', async function (req, res){
    var result = await getWeather(req.query.lat, req.query.long);
    res.send(result);
})

app.get('/getImage', async function(req, res){
    var result = await getImage(req.query.keyword);
    res.send(result);
})