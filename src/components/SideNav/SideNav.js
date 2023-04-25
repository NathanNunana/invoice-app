import React, { useState } from "react";
import "./SideNav.css";
import { Avatar, IconMoon, Logo, IconSun } from "../../assets";

const SideNav = () => {
  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };
  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };
  const selectedTheme = localStorage.getItem("selectedTheme");
  if (selectedTheme === "dark") {
    setDarkMode();
  } else {
    setLightMode();
  }
  const [icon, setIcon] = useState(
    selectedTheme === "dark" ? IconSun : IconMoon
  );
  const toggleTheme = (e) => {
    if (e.target.src.includes("moon")) {
      setDarkMode();
      setIcon(IconSun);
    } else {
      setLightMode();
      setIcon(IconMoon);
    }
  };
  return (
    <>
      <div className="side-nav">
        <div className="logo-wrapper">
          <div className="logo-container"></div>
          <img src={Logo} alt="logo" />
        </div>
        <div className="separator">
          <img
            src={icon}
            alt="icon"
            onClick={toggleTheme}
            className="icon-toggle"
          />
          <hr className="divider" />
          <img src={Avatar} className="avatar" alt="avatar" />
        </div>
      </div>
    </>
  );
};

export default SideNav;
