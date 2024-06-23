// import { Link } from "react-router-dom";
// import "../styles/Header.css";
// import "../styles/App.css";

// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Drawer,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   useTheme,
// } from "@mui/material";

// import { useStateContext } from "../context/stateContext";
// import { DarkModeSwitch } from "./DarkModeSwitch";
// import TemporaryDrawer from "./Drawer";
// import { CountryFlags } from "./CountryFlag";
// import ReactCountryFlag from "react-country-flag";

// export function Header() {
//   const [searchKey, setSearchKey] = useState("");
//   const theme = useTheme();
//   const {
//     country,
//     setCountry,
//     language,
//     setLanguage,
//     darkMode,
//     setDarkMode,
//     checked,
//     setChecked,
//   } = useStateContext();

//   // Cargar el estado inicial de darkMode desde localStorage al montar el componente

//   useEffect(() => {
//     const savedDarkMode = localStorage.getItem("darkMode");
//     if (savedDarkMode === "-dark") {
//       setDarkMode("-dark");
//       setChecked(true);
//     } else {
//       setDarkMode("");
//       setChecked(false);
//     }
//   }, [setDarkMode, setChecked]);

//   // Guardar cambios en localStorage cuando darkMode cambia
//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   const handleChangeCountry = (event) => {
//     setCountry(event.target.value);
//   };

//   const handleChangeLanguage = (event) => {
//     setLanguage(event.target.value);
//   };

//   const handleChangeDarkMode = () => {
//     setDarkMode((prevDarkMode) => (prevDarkMode === "-dark" ? "" : "-dark"));
//     setChecked(darkMode !== "-dark");
//   };

//   const searchMulti = (e) => {
//     e.preventDefault();

//     window.location.href = `/search?q=${searchKey}`;
//   };

//   const items =
//     language === "en-US"
//       ? [
//           { item: "Home", direction: "/" },
//           { item: "Discover Movies", direction: "/discover_movies" },
//           { item: "Upcoming Movies", direction: "/upcoming" },
//           { item: "Series", direction: "/tv" },
//           { item: "Similar", direction: "/similar" },
//           { item: "Register", direction: "/register" },
//         ]
//       : [
//           { item: "Inicio", direction: "/" },
//           { item: "Descubre Peliculas", direction: "/discover_movies" },
//           { item: "Próximos títulos", direction: "/upcoming" },
//           { item: "Series", direction: "/tv" },
//           { item: "Similar", direction: "/similar" },
//           { item: "Registro", direction: "/register" },
//         ];

//   const color = darkMode ? "aliceblue" : "black";

//   const drawerSx = darkMode
//     ? {
//         "& .MuiDrawer-paper": {
//           color: "aliceblue",
//           backgroundColor: "black",
//         },
//         "MuiPaper-root": {
//           color: "aliceblue",
//           backgroundColor: "black",
//         },
//       }
//     : {};

//   const selectSx = darkMode
//     ? {
//         backgroundColor: "black",
//         color: "aliceblue",
//         ".MuiOutlinedInput-notchedOutline": {
//           borderColor: "aliceblue",
//         },
//         "&:hover .MuiOutlinedInput-notchedOutline": {
//           borderColor: "white",
//         },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//           borderColor: "white",
//         },
//         ".MuiSvgIcon-root": {
//           color: "aliceblue",
//         },
//       }
//     : {
//         backgroundColor: "white",
//         color: "black",
//         ".MuiOutlinedInput-notchedOutline": {
//           borderColor: "black",
//         },
//         "&:hover .MuiOutlinedInput-notchedOutline": {
//           borderColor: "gray",
//         },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//           borderColor: "black",
//         },
//         ".MuiSvgIcon-root": {
//           color: "black",
//         },
//       };

//   const darkModeClass = darkMode ? "-dark" : "";

//   return (
//     <div className={`all-body${darkModeClass}`}>
//       <nav className={`all-body${darkModeClass}`}>
//         <TemporaryDrawer items={items} sx={drawerSx} />
//         {/* <Link to={"/"}>{language === "es-ES" ? "Inicio" : "Home"}</Link>
//         <Link to={"/latest_movies"}>
//         {language === "es-ES" ? "Descubre Películas" : "Discover Movies"}
//         </Link>
//         <Link to={"/tv"}>Series</Link>
//         <Link to={"/upcoming"}>
//         {language === "es-ES" ? "Películas próximas" : "Upcoming Movies"}
//         </Link> */}

//         <Link to={"/"}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="2em"
//             height="2em"
//             viewBox="0 0 15 15"
//             color={color}
//           >
//             <path
//               fill="currentColor"
//               d="M13.218 4.246L7.087 6.238a.5.5 0 0 1-.24.079L4.741 7H13.5a.5.5 0 0 1 .5.5v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-5c0-.106.033-.205.09-.287l-.195-.602A2.5 2.5 0 0 1 3.5 3.461l6.657-2.163a2.5 2.5 0 0 1 3.15 1.605l.232.713a.5.5 0 0 1-.321.63m-3.744.165l1.285-2.226a1.5 1.5 0 0 0-.293.064l-1.245.404l-1.308 2.265zm2.295-1.979l-.02.037l-.854 1.48l1.538-.5l-.077-.237a1.5 1.5 0 0 0-.587-.78m-3.97.683l-1.56.507L4.93 5.887l1.56-.507zM2.923 6.54l.587-.19l1.307-2.266l-1.008.328a1.5 1.5 0 0 0-.963 1.89zM3 8v4.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V8z"
//             />
//           </svg>
//         </Link>

//         <form action="" onSubmit={searchMulti}>
//           <input
//             type="text"
//             placeholder={"Buscar"}
//             value={searchKey}
//             onChange={(e) => setSearchKey(e.target.value)}
//             style={{ borderBottom: `1px solid ${color}` }}
//           />
//           <Button
//             sx={{
//               [theme.breakpoints.down("450")]: {
//                 display: "none",
//               },
//             }}
//             className="nav-search-button"
//             onClick={searchMulti}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="2em"
//               height="2em"
//               viewBox="0 0 24 24"
//               color="black"
//             >
//               <path
//                 fill="none"
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="1.5"
//                 d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0"
//                 color="currentColor"
//               />
//             </svg>
//           </Button>
//         </form>

//         <DarkModeSwitch checked={checked} onChange={handleChangeDarkMode} />
//       </nav>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import "../styles/Header.css";
import "../styles/App.css";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import { useStateContext } from "../context/stateContext";
import { DarkModeSwitch } from "./DarkModeSwitch";
import TemporaryDrawer from "./Drawer";
import { CountryFlags } from "./CountryFlag";
import ReactCountryFlag from "react-country-flag";

export function Header() {
  const [searchKey, setSearchKey] = useState("");
  const theme = useTheme();
  const {
    country,
    setCountry,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    checked,
    setChecked,
  } = useStateContext();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
      setChecked(JSON.parse(savedDarkMode));
    } else {
      setDarkMode(false);
      setChecked(false);
    }
  }, [setDarkMode, setChecked]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleChangeDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      setChecked(newDarkMode);
      return newDarkMode;
    });
  };

  const searchMulti = (e) => {
    e.preventDefault();
    window.location.href = `/search?q=${searchKey}`;
  };

  const items =
    language === "en-US"
      ? [
          { item: "Home", direction: "/" },
          { item: "Discover Movies", direction: "/discover_movies" },
          { item: "Upcoming Movies", direction: "/upcoming" },
          { item: "Series", direction: "/tv" },
          { item: "Register", direction: "/register" },
        ]
      : [
          { item: "Inicio", direction: "/" },
          { item: "Descubre Peliculas", direction: "/discover_movies" },
          { item: "Próximos títulos", direction: "/upcoming" },
          { item: "Series", direction: "/tv" },
          { item: "Registro", direction: "/register" },
        ];

  const color = darkMode ? "aliceblue" : "black";

  const drawerSx = darkMode
    ? {
        "& .MuiDrawer-paper": {
          color: "aliceblue",
          backgroundColor: "black",
        },
        "MuiPaper-root": {
          color: "aliceblue",
          backgroundColor: "black",
        },
      }
    : {};

  const selectSx = darkMode
    ? {
        backgroundColor: "black",
        color: "aliceblue",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "aliceblue",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        ".MuiSvgIcon-root": {
          color: "aliceblue",
        },
      }
    : {
        backgroundColor: "white",
        color: "black",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "gray",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black",
        },
        ".MuiSvgIcon-root": {
          color: "black",
        },
      };

  const darkModeClass = darkMode ? "dark" : "";

  return (
    <div className={`all-body${darkModeClass} nav-div`}>
      <nav className={`all-body${darkModeClass}`}>
        <TemporaryDrawer items={items} sx={drawerSx} />
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 15 15"
            color={color}
          >
            <path
              fill="currentColor"
              d="M13.218 4.246L7.087 6.238a.5.5 0 0 1-.24.079L4.741 7H13.5a.5.5 0 0 1 .5.5v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 12.5v-5c0-.106.033-.205.09-.287l-.195-.602A2.5 2.5 0 0 1 3.5 3.461l6.657-2.163a2.5 2.5 0 0 1 3.15 1.605l.232.713a.5.5 0 0 1-.321.63m-3.744.165l1.285-2.226a1.5 1.5 0 0 0-.293.064l-1.245.404l-1.308 2.265zm2.295-1.979l-.02.037l-.854 1.48l1.538-.5l-.077-.237a1.5 1.5 0 0 0-.587-.78m-3.97.683l-1.56.507L4.93 5.887l1.56-.507zM2.923 6.54l.587-.19l1.307-2.266l-1.008.328a1.5 1.5 0 0 0-.963 1.89zM3 8v4.5A1.5 1.5 0 0 0 4.5 14h7a1.5 1.5 0 0 0 1.5-1.5V8z"
            />
          </svg>
        </Link>
        <form action="" onSubmit={searchMulti}>
          <input
            type="text"
            placeholder={"Buscar"}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            style={{ borderBottom: `1px solid ${color}` }}
          />
          <Button
            sx={{
              [theme.breakpoints.down("450")]: {
                display: "none",
              },
            }}
            className="nav-search-button"
            onClick={searchMulti}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
              color="black"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0"
                color="currentColor"
              />
            </svg>
          </Button>
        </form>
        <DarkModeSwitch checked={checked} onChange={handleChangeDarkMode} />
      </nav>
    </div>
  );
}
