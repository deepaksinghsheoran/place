// HorizontalNavbar.js
import React, { useState } from "react";

const HorizontalNavbar = ({ searchbar, notificationIconSrc, userIconSrc }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="hori-navbar">
      <div className="searchbar">{searchbar}</div>
      <div className="notification" onClick={toggleDropdown}>
        <img src="./img/notification.png" alt="Notification" />
        {showDropdown && (
          <div className="dropdown">
            
          </div>
        )}
      </div>
      <div className="user-icon" onClick={toggleDropdown}>
        <img src="./img/advisor.png" alt="User" />
        <img src="./img/dropdown.png" alt="Dropdown" />
       
        {showDropdown && (
          <div className="dropdown">
           
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalNavbar;
