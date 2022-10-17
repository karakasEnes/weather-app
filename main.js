require('dotenv').config();
const { askGeo, askWeather } = require('./utils/api');

const userInputAddress = process.argv[2];

function doWork() {
  if (!userInputAddress) {
    console.log('Please Provide an address');
    return;
  }

  askGeo(userInputAddress, (err, data = {}) => {
    if (err) {
      console.log(err);
      return;
    }

    const { latitude, longitude, location } = data;
    console.log(location);
    askWeather(latitude, longitude, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      const { temperature, weather_descriptions } = data.current;
      console.log(temperature);
      console.log(weather_descriptions);
    });
  });
}

doWork();
