const axios = require('axios');

const askGeo = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.KEY_MAPBOX}&limit=1`;

  axios
    .get(url)
    .then((res) => {
      const data = res.data;
      console.log(data);
      if (data.features.length === 0) {
        callback({
          errMessage: "Location didn't find, try again please.",
        });
      } else {
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name,
        });
      }
    })
    .catch((err) => {
      callback({ errMessage: err });
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
      if (!data.location.name) {
        callback({ errMessage: 'Cannot find location in weather service!' });
      } else {
        callback(undefined, data);
      }
    })
    .catch((err) => {
      callback({ errMessage: err }, undefined);
    });
};

module.exports = {
  askGeo,
  askWeather,
};
