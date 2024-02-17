import { useWeather } from "../../contexts/WeatherContext";
import styles from "./WeatherToday.module.css";

function WeatherToday() {
  const { weather, celcius, iconMapping, kelvinToCelsius, kelvinToFahrenheit } =
    useWeather();
  let weatherToday;

  if (weather) {
    weatherToday = weather.weatherToday;
  }

  return (
    <div className={styles.app}>
      {weatherToday && (
        <>
          <p className={styles.heading}>
            Check Out Today's Weather Information for{" "}
            <span className={styles.bold}>
              {weatherToday.name}, {weatherToday.country}
            </span>
          </p>
          <div className={styles.ui}>
            <div className={styles.image}>{iconMapping[weatherToday.icon]}</div>
            <div className={styles.details}>
              <div className={styles.temp}>
                {celcius
                  ? kelvinToCelsius(weatherToday.temp)
                  : kelvinToFahrenheit(weatherToday.temp)}
                <span className={styles.degree}>{celcius ? "°C" : "°F"}</span>
              </div>
              <div className={styles.main}>{weatherToday.main}</div>
              <div className={styles.desc}>{weatherToday.description}</div>
            </div>
            <div className={styles.tempmnmx}>
              <div className={styles.minmax}>
                <p>
                  <span className={styles.bold}>Max:</span>{" "}
                  {celcius
                    ? `${kelvinToCelsius(weatherToday.temp_max)}°C`
                    : `${kelvinToFahrenheit(weatherToday.temp_max)}°F`}
                </p>
              </div>
              <div className={styles.minmax}>
                <p>
                  <span className={styles.bold}>Min:</span>{" "}
                  {celcius
                    ? `${kelvinToCelsius(weatherToday.temp_min)}°C`
                    : `${kelvinToFahrenheit(weatherToday.temp_min)}°F`}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherToday;
