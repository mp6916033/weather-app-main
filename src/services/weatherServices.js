const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const getFormattedWeatherData = async (searchParams) => {
  const weatherRaw = await getWeatherData("weather", searchParams);

  const {
    name,
    sys: { country, sunrise, sunset },
    weather: [{ main, description, icon }],
    main: { temp, temp_min, temp_max, pressure, humidity },
    visibility,
    wind: { speed },
    coord: { lat, lon },
  } = weatherRaw;

  const weatherToday = {
    name,
    country,
    icon,
    temp,
    main,
    description,
    temp_max,
    temp_min,
  };

  const moreDetails = {
    sunrise,
    sunset,
    pressure,
    humidity,
    visibility,
    speed,
  };

  const forecastRaw = await getWeatherData("forecast", { lat, lon });

  const hourlyDetailsRaw = forecastRaw.list.slice(1, 8);

  const indexesToKeep = [7, 15, 23, 31, 39];
  const dailyDetailsRaw = indexesToKeep.map((index) => forecastRaw.list[index]);

  const hourlyDetails = hourlyDetailsRaw.map((d) => {
    return {
      time: d.dt_txt,
      icon: d.weather[0].icon,
      temp: d.main.temp,
      main: d.weather[0].main,
      description: d.weather[0].description,
      temp_max: d.main.temp_max,
      temp_min: d.main.temp_min,
      pressure: d.main.pressure,
      humidity: d.main.humidity,
      visibility: d.visibility,
      wind: d.wind.speed,
    };
  });

  const dailyDetails = dailyDetailsRaw.map((d) => {
    return {
      icon: d.weather[0].icon,
      time: d.dt_txt,
      main: d.weather[0].main,
      temp_max: d.main.temp_max,
      temp_min: d.main.temp_min,
      temp: d.main.temp,
      description: d.weather[0].description,
      pressure: d.main.pressure,
      humidity: d.main.humidity,
      visibility: d.visibility,
      wind: d.wind.speed,
    };
  });
  return { weatherToday, moreDetails, hourlyDetails, dailyDetails };
};

export { getFormattedWeatherData };
