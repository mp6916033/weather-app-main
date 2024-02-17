import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import DegreeMode from "../DegreeMode/DegreeMode";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <SearchBar />
      <DegreeMode />
    </header>
  );
}

export default Header;
