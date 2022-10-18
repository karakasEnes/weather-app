require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const { askGeo, askWeather } = require('../utils/api');
const PORT = process.env.PORT || 4000;

const publicDirectoryPath = path.join(__dirname, '../public');
// const viewsPath = path.join(__dirname, '../views');
app.use(express.static(publicDirectoryPath));

app.set('view engine', 'ejs');
// app.set('views', viewsPath);

app.get('', (req, res) => {
  res.render('index', {
    pageTitle: 'Weather App',
    title: 'Weather',
  });
});

app.get('/weather', function (req, res) {
  if (!req.query.search) {
    return res.send({
      errMessage: 'Please provide a search keyword!',
    });
  }

  askGeo(req.query.search, (err, data = {}) => {
    if (err) {
      return res.send(err);
    }

    const { latitude, longitude, location } = data;

    askWeather(latitude, longitude, (err, data) => {
      if (err) {
        return res.send(err);
      }

      const { temperature, weather_descriptions } = data.current;

      const relatedData = {
        searchedLocation: location,
        weatherDescription: weather_descriptions[0],
        weatherTemperature: temperature,
        weatherLocationName: data.location.name,
        weatherCountryName: data.location.country,
        weatherRegionName: data.location.region,
        weatherLocalTime: data.location.localtime,
      };

      const strToSend = `In ${relatedData.weatherLocationName} weather is ${relatedData.weatherDescription}. Temperature is ${relatedData.weatherTemperature} &deg; degree (celsius). Current time is: ${relatedData.weatherLocalTime}`;

      return res.send({
        searchedLocation: location,
        strToSend,
      });
    });
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    title: 'About',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    pageTitle: '404',
    title: '404',
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
