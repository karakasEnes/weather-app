require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const { askGeo, askWeather } = require('../utils/api');
const PORT = process.env.PORT || 4444;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.get('/weather', function (req, res) {
  if (!req.query.search) {
    return res.send({
      errMes: 'Please provide a search keyword!',
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

      return res.send({
        searchedLocation: location,
        weatherDescription: weather_descriptions[0],
        weatherTemperature: temperature,
        weatherLocationName: data.location.name,
        weatherCountryName: data.location.country,
        weatherRegionName: data.location.region,
        weatherLocalTime: data.location.localtime,
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
