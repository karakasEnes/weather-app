const axios = require('axios');

const askGeo = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.KEY_MAPBOX}&limit=1`;

  axios
    .get(url)
    .then((res) => {
      const data = res.data;
      if (data.length === 0) {
        console.log("Location didn't find, try again please.");
      } else {
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name,
        });
      }
    })
    .catch((err) => {
      callback(err);
    });
};

const askWeather = (latitude, longitude, callback) => {
  params = {
    access_key: process.env.KEY_WEATHER,
    query: `${latitude},${longitude}`,
  };
  const url = 'http://api.weatherstack.com/current';

  axios
    .get(url, { params })
    .then((res) => {
      const data = res.data;
      callback(undefined, data);
    })
    .catch((err) => {
      callback(err, undefined);
    });
};

module.exports = {
  askGeo,
  askWeather,
};
