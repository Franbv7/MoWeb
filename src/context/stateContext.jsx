import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateProvider = ({ children }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const CREDIT_IMAGE_PATH = "https://image.tmdb.org/t/p/w200";
  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [country, setCountry] = useState("US");
  const [language, setLanguage] = useState("en-US");
  const [darkMode, setDarkMode] = useState(false);
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState(null);

  let logoLang;
  let providerLang;

  language === "en-US" ? (logoLang = "en") : (logoLang = "es");
  language === "en-US" ? (providerLang = "US") : (providerLang = "ES");

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      try {
        if (savedDarkMode === "-dark") {
          localStorage.removeItem("darkMode");
        } else {
          setDarkMode(JSON.parse(savedDarkMode));
        }
      } catch (e) {
        console.error("Error parsing darkMode from localStorage", e);
        localStorage.removeItem("darkMode");
      }
    }

    const savedCountry = localStorage.getItem("country");
    if (savedCountry !== null) {
      setCountry(savedCountry);
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage !== null) {
      setLanguage(savedLanguage);
    }

    const savedUser = localStorage.getItem("user");
    if (savedUser !== null) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("country", country);
  }, [country]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // console.log(user);

  return (
    <Context.Provider
      value={{
        IMAGE_PATH,
        API_URL,
        API_KEY,
        CREDIT_IMAGE_PATH,
        logoLang,
        providerLang,
        country,
        setCountry,
        language,
        setLanguage,
        darkMode,
        setDarkMode,
        checked,
        setChecked,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
