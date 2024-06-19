// // // import { createContext, useContext } from "react";

// // // const Context = createContext();

// // // export const StateProvider = ({ children }) => {
// // //   const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
// // //   const CREDIT_IMAGE_PATH = "https://image.tmdb.org/t/p/w200";
// // //   const API_URL = import.meta.env.API_URL;
// // //   const API_KEY = import.meta.env.API_KEY;

// // //   return (
// // //     <Context.Provider
// // //       value={{ IMAGE_PATH, API_URL, API_KEY, CREDIT_IMAGE_PATH }}
// // //     >
// // //       {children}
// // //     </Context.Provider>
// // //   );
// // // };

// // // export const useStateContext = () => useContext(Context);

// // // context/stateContext.jsx
// // import React, { createContext, useContext, useState } from "react";

// // const Context = createContext();

// // export const StateProvider = ({ children }) => {
// //   const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
// //   const CREDIT_IMAGE_PATH = "https://image.tmdb.org/t/p/w200";
// //   const API_URL = import.meta.env.VITE_API_URL; // Accede a la variable de entorno API_URL
// //   const API_KEY = import.meta.env.VITE_API_KEY; // Accede a la variable de entorno API_KEY
// //   const [country, setCountry] = useState("US");
// //   const [language, setLanguage] = useState("en-US");
// //   const [darkMode, setDarkMode] = useState("");
// //   const [checked, setChecked] = useState(false);

// //   let logoLang;

// //   language === "en-US" ? (logoLang = "en") : (logoLang = "es");

// //   return (
// //     <Context.Provider
// //       value={{
// //         IMAGE_PATH,
// //         API_URL,
// //         API_KEY,
// //         CREDIT_IMAGE_PATH,
// //         logoLang,
// //         country,
// //         setCountry,
// //         language,
// //         setLanguage,
// //         darkMode,
// //         setDarkMode,
// //         checked,
// //         setChecked,
// //       }}
// //     >
// //       {children}
// //     </Context.Provider>
// //   );
// // };

// // export const useStateContext = () => useContext(Context);

import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext();

export const StateProvider = ({ children }) => {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const CREDIT_IMAGE_PATH = "https://image.tmdb.org/t/p/w200";
  const API_URL = import.meta.env.VITE_API_URL; // Accede a la variable de entorno API_URL
  const API_KEY = import.meta.env.VITE_API_KEY; // Accede a la variable de entorno API_KEY
  const [country, setCountry] = useState("US");
  const [language, setLanguage] = useState("en-US");
  const [darkMode, setDarkMode] = useState(null); // Estado inicial para el modo oscuro
  const [checked, setChecked] = useState(false);

  let logoLang;
  let providerLang;

  language === "en-US" ? (logoLang = "en") : (logoLang = "es");
  language === "en-US" ? (providerLang = "US") : (providerLang = "ES");

  // Cargar el estado inicial desde localStorage al montar el componente
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    const savedCountry = localStorage.getItem("country");
    if (savedCountry !== null) {
      setCountry(savedCountry);
    }

    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage !== null) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Guardar cambios en localStorage cuando darkMode, country o language cambian
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("country", country);
  }, [country]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
