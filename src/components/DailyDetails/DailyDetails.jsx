import { useWeather } from "../../contexts/WeatherContext";
import styles from "./DailyDetails.module.css";

function DailyDetails() {
  const {
    weather,
    celcius,
    iconMapping,
    dateToDate,
    kelvinToCelsius,
    kelvinToFahrenheit,
  } = useWeather();
  let dailyDetails;

  if (weather) {
    dailyDetails = weather.dailyDetails;
  }

  return (
    <div className={styles.app}>
      {dailyDetails && (
        <>
          <p className={styles.heading}>Daily Details of Weather</p>
          <div className={styles.ui}>
            <div>
              {dailyDetails.map((dailyDetail, index) => (
                <div key={index} className={styles.box}>
                  <div className={styles.icon}>
                    {iconMapping[dailyDetail.icon]}
                  </div>
                  <div className={styles.day}>
                    {dateToDate(dailyDetail.time)}
                  </div>
                  <div className={styles.weather}>
                    {dailyDetail.description}
                  </div>
                  <div className={styles.temp}>
                    {celcius
                      ? `${kelvinToCelsius(dailyDetail.temp)}°C`
                      : `${kelvinToFahrenheit(dailyDetail.temp)}°F`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DailyDetails;
