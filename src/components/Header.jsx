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
} from "@mui/material";

import { useStateContext } from "../context/stateContext";
import { DarkModeSwitch } from "./DarkModeSwitch";
import TemporaryDrawer from "./Drawer";
import { CountryFlags } from "./CountryFlag";
import ReactCountryFlag from "react-country-flag";

export function Header() {
  const [searchKey, setSearchKey] = useState("");

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

  // Cargar el estado inicial de darkMode desde localStorage al montar el componente

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "-dark") {
      setDarkMode("-dark");
      setChecked(true);
    } else {
      setDarkMode("");
      setChecked(false);
    }
  }, [setDarkMode, setChecked]);

  // Guardar cambios en localStorage cuando darkMode cambia
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleChangeDarkMode = () => {
    setDarkMode((prevDarkMode) => (prevDarkMode === "-dark" ? "" : "-dark"));
    setChecked(darkMode !== "-dark");
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
          { item: "Similar", direction: "/similar" },
          { item: "Register", direction: "/register" },
        ]
      : [
          { item: "Inicio", direction: "/" },
          { item: "Descubre Peliculas", direction: "/discover_movies" },
          { item: "Próximos títulos", direction: "/upcoming" },
          { item: "Series", direction: "/tv" },
          { item: "Similar", direction: "/similar" },
          { item: "Registro", direction: "/register" },
        ];

  const color = darkMode ? "aliceblue" : "black";

  const drawerSx = darkMode
    ? {
        "& .MuiDrawer-paper": {
          color: "aliceblue",
          backgroundColor: "black",
          height: "50vh",
        },
        "MuiPaper-root": {
          color: "aliceblue",
          backgroundColor: "black",
        },
      }
    : {
        "& .MuiDrawer-paper": {
          height: "50vh",
        },
      };

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

  return (
    <div className={`all-body${darkMode}`}>
      <nav className={`all-body${darkMode}`}>
        <DarkModeSwitch checked={checked} onChange={handleChangeDarkMode} />

        {/* <Link to={"/"}>{language === "es-ES" ? "Inicio" : "Home"}</Link>
        <Link to={"/latest_movies"}>
        {language === "es-ES" ? "Descubre Películas" : "Discover Movies"}
        </Link>
        <Link to={"/tv"}>Series</Link>
        <Link to={"/upcoming"}>
        {language === "es-ES" ? "Películas próximas" : "Upcoming Movies"}
        </Link> */}

        <form action="" onSubmit={searchMulti}>
          <input
            type="text"
            placeholder={"Buscar"}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            style={{ borderBottom: `1px solid ${color}` }}
          />
          <Button>
            {/* {language === "es-ES" ? "Buscar" : "Search"} */}
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
              height={"2rem"}
              color="black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg> */}
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
        <TemporaryDrawer items={items} sx={drawerSx} />

        {/* Country */}

        {/* <Box sx={{ minWidth: 80 }}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: selectSx.color }}
            >
              {language === "es-ES" ? "País" : "Country"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={country}
              label={language === "es-ES" ? "País" : "Country"}
              onChange={handleChangeCountry}
              sx={selectSx}
            >
              <MenuItem value={"ES"}>
                
                <ReactCountryFlag countryCode="ES" svg />
              </MenuItem>
              <MenuItem value={"US"}>
                
                <ReactCountryFlag countryCode="US" svg />
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 80 }}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: selectSx.color, minWidth: "0" }}
            >
              {language === "es-ES" ? "Idioma" : "Language"}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              label={language === "es-ES" ? "Idioma" : "Language"}
              onChange={handleChangeLanguage}
              sx={selectSx}
            >
              <MenuItem value={"es-ES"}>
                <ReactCountryFlag countryCode="ES" svg />
              </MenuItem>
              <MenuItem value={"en-US"}>
                <ReactCountryFlag countryCode="US" svg />
              </MenuItem>
            </Select>
          </FormControl>
        </Box> */}
      </nav>
    </div>
  );
}

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
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";

// import { useStateContext } from "../context/stateContext";
// import { DarkModeSwitch } from "./DarkModeSwitch";
// import TemporaryDrawer from "./Drawer";

// export function Header() {
//   const [searchKey, setSearchKey] = useState("");

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

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <div className={`all-body${darkMode}`}>
//       <nav
//         className={`all-body${darkMode}`}
//         style={{ padding: isSmallScreen ? "0 10px" : "0 20px" }}
//       >
//         <DarkModeSwitch checked={checked} onChange={handleChangeDarkMode} />

//         {isSmallScreen ? (
//           <TemporaryDrawer items={items} sx={drawerSx} />
//         ) : (
//           <div style={{ display: "flex", gap: "10px" }}>
//             {items.map(({ item, direction }) => (
//               <Link key={direction} to={direction}>
//                 {item}
//               </Link>
//             ))}
//           </div>
//         )}

//         <form
//           action=""
//           onSubmit={searchMulti}
//           style={{
//             display: isSmallScreen ? "block" : "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           <input
//             type="text"
//             placeholder={
//               language === "es-ES"
//                 ? "Vengadores, Futurama..."
//                 : "Avengers, Futurama..."
//             }
//             value={searchKey}
//             onChange={(e) => setSearchKey(e.target.value)}
//             style={{ width: isSmallScreen ? "100%" : "auto" }}
//           />
//           <Button variant="outlined" size="small" type="submit">
//             {language === "es-ES" ? "Buscar" : "Search"}
//           </Button>
//         </form>

//         {/* Country */}

//         <Box sx={{ minWidth: 120, marginTop: isSmallScreen ? "10px" : "0" }}>
//           <FormControl fullWidth>
//             <InputLabel
//               id="demo-simple-select-label"
//               sx={{ color: selectSx.color }}
//             >
//               {language === "es-ES" ? "País" : "Country"}
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={country}
//               label={language === "es-ES" ? "País" : "Country"}
//               onChange={handleChangeCountry}
//               sx={selectSx}
//             >
//               <MenuItem value={"ES"}>
//                 {language === "es-ES" ? "España" : "Spain"}
//               </MenuItem>
//               <MenuItem value={"US"}>
//                 {language === "es-ES" ? "EEUU" : "USA"}
//               </MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         <Box sx={{ minWidth: 120, marginTop: isSmallScreen ? "10px" : "0" }}>
//           <FormControl fullWidth>
//             <InputLabel
//               id="demo-simple-select-label"
//               sx={{ color: selectSx.color }}
//             >
//               {language === "es-ES" ? "Idioma" : "Language"}
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={language}
//               label={language === "es-ES" ? "Idioma" : "Language"}
//               onChange={handleChangeLanguage}
//               sx={selectSx}
//             >
//               <MenuItem value={"es-ES"}>Español</MenuItem>
//               <MenuItem value={"en-US"}>English</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </nav>
//     </div>
//   );
// }
