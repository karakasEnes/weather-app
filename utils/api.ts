import { AxiosResponse, AxiosError } from 'axios';

import axios from 'axios';

export interface IGeoResult {
  features: {
    center: number[];
    place_name: string;
  }[];
}

export interface IWeatherResponse {
  location: {
    name: string | null;
    country: string | null;
    region: string | null;
    localtime: string | null;
  };

  current: {
    temperature: number;
    weather_descriptions: string[];
  };
}

export type ErrorT = {
  errMessage: string;
};

export const askGeo = (address: string, callback: Function) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.KEY_MAPBOX}&limit=1`;

  axios
    .get(url)
    .then((res: AxiosResponse<IGeoResult>) => {
      const data = res.data;
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
    .catch((err: AxiosError) => {
      callback({ errMessage: err.message });
    });
};

export const askWeather = (
  latitude: number,
  longitude: number,
  callback: Function
) => {
  const params = {
    access_key: process.env.KEY_WEATHER,
    query: `${latitude},${longitude}`,
  };
  const url = 'http://api.weatherstack.com/current';

  axios
    .get(url, { params })
    .then((res: AxiosResponse<IWeatherResponse>) => {
      const data: IWeatherResponse = res.data;
      if (!data.location.name) {
        callback({ errMessage: 'Cannot find location in weather service!' });
      } else {
        callback(undefined, data);
      }
    })
    .catch((err: AxiosError) => {
      callback({ errMessage: err.message }, undefined);
    });
};
