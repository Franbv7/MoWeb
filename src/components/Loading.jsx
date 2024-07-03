import React from "react";
import { Bars } from "react-loader-spinner";
import { Header } from "./Header";
import { useStateContext } from "../context/stateContext";

export function Loading() {
  const { darkMode } = useStateContext();

  const darkModeClass = darkMode ? "dark" : "";
  return (
    <>
      {/* <Header /> */}
      <div className={`loading-page ${darkModeClass}`}>
        <Bars
          height="80"
          width="80"
          color={darkMode ? "white" : "black"}
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}
