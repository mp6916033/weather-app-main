import { useWeather } from "../../contexts/WeatherContext";
import styles from "./HourlyDetails.module.css";

function HourlyDetails() {
  const {
    weather,
    celcius,
    iconMapping,
    dateToTime,
    kelvinToCelsius,
    kelvinToFahrenheit,
  } = useWeather();
  let hourlyDetails;

  if (weather) {
    hourlyDetails = weather.hourlyDetails;
  }

  return (
    <div className={styles.app}>
      {hourlyDetails && (
        <>
          <p className={styles.heading}>Hourly Details of Weather</p>
          <div className={styles.ui}>
            {hourlyDetails.map((hourlyDetail, index) => (
              <div key={index} className={styles.box}>
                <div className={styles.time}>
                  {dateToTime(hourlyDetail.time)}
                </div>
                <div className={styles.icon}>
                  {iconMapping[hourlyDetail.icon]}
                </div>
                <div className={styles.temp}>
                  {celcius
                    ? `${kelvinToCelsius(hourlyDetail.temp)}°C`
                    : `${kelvinToFahrenheit(hourlyDetail.temp)}°F`}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HourlyDetails;
