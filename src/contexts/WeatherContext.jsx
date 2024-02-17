import { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";

import { MdSunny } from "react-icons/md";
import { TbMist } from "react-icons/tb";
import { IoThunderstorm, IoCloudSharp, IoRainy, IoSnow } from "react-icons/io5";
import {
  BsFillCloudRainHeavyFill,
  BsCloudSunFill,
  BsCloudsFill,
} from "react-icons/bs";

import { getFormattedWeatherData } from "../services/weatherServices";

const WeatherContext = createContext();

function WeatherProvider({ children }) {
  const [query, setQuery] = useState({ q: "" });
  const [weather, setWeather] = useState(null);
  const [celcius, setCelcius] = useState(true);

  const fetchWeather = async () => {
    try {
      await getFormattedWeatherData({ ...query }).then((data) => {
        toast.success(
          `Successfully Fetched Weather for ${data?.weatherToday.name}, ${data?.weatherToday.country}.`
        );
        setWeather(data);
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      toast.error("Error Fetching Weather. Please Enter Correct City Name.");
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const kelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin - 273.15) * (9 / 5) + 32);
  };

  const toggleDegree = () => {
    setCelcius((celcius) => !celcius);
  };

  const secondsToTime = (seconds) => {
    const date = new Date(seconds * 1000);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const amPm = hours < 12 ? "AM" : "PM";

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  const dateToTime = (dateString) => {
    const date = new Date(dateString);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const amPm = hours < 12 ? "AM" : "PM";

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  };

  const dateToDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchWeather();
      e.target.blur();
    }
  };

  const handleSearch = () => {
    fetchWeather();
  };

  const iconMapping = {
    "01d": <MdSunny />,
    "01n": <MdSunny />,
    "02d": <BsCloudSunFill />,
    "02n": <BsCloudSunFill />,
    "03d": <IoCloudSharp />,
    "03n": <IoCloudSharp />,
    "04d": <BsCloudsFill />,
    "04n": <BsCloudsFill />,
    "09d": <BsFillCloudRainHeavyFill />,
    "09n": <BsFillCloudRainHeavyFill />,
    "10d": <IoRainy />,
    "10n": <IoRainy />,
    "11d": <IoThunderstorm />,
    "11n": <IoThunderstorm />,
    "13d": <IoSnow />,
    "13n": <IoSnow />,
    "50d": <TbMist />,
    "50n": <TbMist />,
  };

  return (
    <WeatherContext.Provider
      value={{
        query,
        weather,
        celcius,
        iconMapping,
        setQuery,
        toggleDegree,
        secondsToTime,
        dateToTime,
        dateToDate,
        handleSearch,
        handleKeyDown,
        kelvinToCelsius,
        kelvinToFahrenheit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined)
    throw new Error("WeatherContext was used outside of the WeatherProvider");
  return context;
}

export { WeatherProvider, useWeather };
