import { TbSun, TbSunset2 } from "react-icons/tb";
import { MdOutlineVisibility } from "react-icons/md";
import { SlSpeedometer } from "react-icons/sl";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";

import { useWeather } from "../../contexts/WeatherContext";
import styles from "./MoreDetails.module.css";

function MoreDetails() {
  const { weather, secondsToTime } = useWeather();
  let moreDetails;

  if (weather) {
    moreDetails = weather.moreDetails;
  }

  return (
    <div className={styles.app}>
      {moreDetails && (
        <>
          <p className={styles.heading}>More Details of Today's Weather</p>
          <div className={styles.ui}>
            <div className={styles.box}>
              <div className={styles.text}>Sunrise</div>
              <div className={`${styles.icon} ${styles.sunrise}`}>
                <TbSun />
              </div>
              <div className={styles.value}>
                {secondsToTime(moreDetails.sunrise)}
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.text}>Sunset</div>
              <div className={`${styles.icon} ${styles.sunset}`}>
                <TbSunset2 />
              </div>
              <div className={styles.value}>
                {secondsToTime(moreDetails.sunset)}
              </div>
            </div>
            <div className={styles.box}>
              <div className={styles.text}>Pressure</div>
              <div className={`${styles.icon} ${styles.pressure}`}>
                <SlSpeedometer />
              </div>
              <div className={styles.value}>{moreDetails.pressure} hPa</div>
            </div>
            <div className={styles.box}>
              <div className={styles.text}>Humidity</div>
              <div className={`${styles.icon} ${styles.humidity}`}>
                <WiHumidity />
              </div>
              <div className={styles.value}>{moreDetails.humidity} %</div>
            </div>
            <div className={styles.box}>
              <div className={styles.text}>Visibility</div>
              <div className={`${styles.icon} ${styles.visibility}`}>
                <MdOutlineVisibility />
              </div>
              <div className={styles.value}>{moreDetails.visibility} km</div>
            </div>
            <div className={styles.box}>
              <div className={styles.text}>Wind</div>
              <div className={`${styles.icon} ${styles.wind}`}>
                <FaWind />
              </div>
              <div className={styles.value}>{moreDetails.speed} kph</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MoreDetails;
