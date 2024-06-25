import { Header } from "../components/Header";
import { useStateContext } from "../context/stateContext";

export default function UserPage() {
  const {
    IMAGE_PATH,
    CREDIT_IMAGE_PATH,
    API_KEY,
    language,
    darkMode,
    logoLang,
  } = useStateContext();

  const darkModeClass = darkMode ? "dark" : "";
  return (
    <>
      <Header />
      <div className={`user-body ${darkModeClass}`}>
        <h1>USERPAGE</h1>{" "}
      </div>
    </>
  );
}
