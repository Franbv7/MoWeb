import React from "react";
import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useStateContext } from "../context/stateContext";

// Estilos personalizados para el componente Rating
const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: theme.palette.mode === "dark" ? "#ffb400" : "#ffa726",
  },
  "& .MuiRating-iconHover": {
    color: theme.palette.mode === "dark" ? "#ffb400" : "#ffca28",
  },
  "& .MuiRating-iconEmpty": {
    color: theme.palette.mode === "dark" ? "#ffffff50" : "#cccaca65",
  },
}));

const CustomRating = ({ value, readOnly, ...props }) => {
  const { darkMode } = useStateContext();

  return (
    <StyledRating
      {...props}
      value={value}
      readOnly={readOnly}
      theme={{ palette: { mode: darkMode ? "dark" : "light" } }}
    />
  );
};

export default CustomRating;
