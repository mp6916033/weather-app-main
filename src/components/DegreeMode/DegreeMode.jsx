import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";

import { useWeather } from "../../contexts/WeatherContext";
import styles from "./DegreeMode.module.css";

function ViewMode() {
  const { toggleDegree } = useWeather();

  return (
    <div className={styles.mode}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id="fahrenheit-checkbox"
        onChange={toggleDegree}
      />
      <label htmlFor="fahrenheit-checkbox" className={styles.label}>
        <RiCelsiusFill />
        <RiFahrenheitFill />
        <div className={styles.ball} />
      </label>
    </div>
  );
}

export default ViewMode;
