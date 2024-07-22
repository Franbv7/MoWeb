import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { useState } from "react";

export default function TemporaryDrawer({ items, sx }) {
  const [open, setOpen] = useState(false);
  const {
    country,
    setCountry,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    // checked,
    setChecked,
  } = useStateContext();

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleChangeDarkMode = () => {
    setDarkMode((prevDarkMode) => (prevDarkMode === "dark" ? "" : "dark"));
    setChecked(darkMode !== "dark");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

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
        "MuiBox-root css-1dehfy1": {
          margin: "10px",
        },
      };

  const DrawerList = (
    <Box sx={{ width: 250, height: "100vh", ...selectSx }} role="presentation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6 drawer-cross"
        onClick={toggleDrawer(false)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>

      <List>
        {/* <DarkModeSwitch checked={checked} onChange={handleChangeDarkMode} /> */}
        {/* <ListItem disablePadding>
          <ListItemButton>
            <Link
              to={direction}
              style={{
                width: "-webkit-fill-available",
                height: "-webkit-fill-available",
              }}
            >
              <ListItemText>{item}</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem> */}
        {items.map(({ item, direction }, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <Link
                to={direction}
                style={{
                  width: "-webkit-fill-available",
                  // height: "-webkit-fill-available",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <ListItemText>{item}</ListItemText>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ minWidth: 80 }}>
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
              {/* {language === "es-ES" ? "España" : "Spain"} */}
              <ReactCountryFlag countryCode="ES" svg /> España
            </MenuItem>
            <MenuItem value={"US"}>
              {/* {language === "es-ES" ? "EEUU" : "USA"} */}
              <ReactCountryFlag countryCode="US" svg /> USA
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
              <ReactCountryFlag countryCode="ES" svg /> Español
            </MenuItem>
            <MenuItem value={"en-US"}>
              <ReactCountryFlag countryCode="US" svg /> English
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} sx={{ padding: 0 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 6.001h18m-18 6h18m-18 6h18"
          />
        </svg>
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          ...sx,
          "& .MuiDrawer-paper": {
            // height: "50vh", // Establece la altura del paper del Drawer a 50vh
            // top: "0",
            // bottom: 0,
            // width: 250, // Ancho del Drawer
            // position: "fixed", // Asegura que el Drawer se mantenga fijo al desplazar la página
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
