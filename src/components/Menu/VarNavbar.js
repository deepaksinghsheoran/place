import React, { useState } from "react";
import { Link } from "react-router-dom";

const CustomNav = ({ li }) => {
  const [window, setWindow] = useState(false);

  let openClose = () => {
    if (window === false) {
      setWindow(true);
    } else {
      setWindow(false);
    }
  };
  return (
    <nav className="navbar-menu" style={{ width: window === false ? 250 : 60 }}>
      {/* <div className="burger" onClick={() => openClose()}>
        <img src="./img/menu.png" alt="burger" />
      </div> */}
      <div className="assiduus"><img src="./img/assiduus.png" alt="ASSIDUUS" /></div>
      <ul className="navbar__list">
        {li.map((item, i) => (
          <div className="navbar__li-box" key={i}>
            <Link to={`/${item[0].toLowerCase()}`}>
              <img
                src={item[1]}
                alt={item[1]}

              />
              <li
                className="navbar__li"
                style={{ display: window === false ? "inline-block" : "none" }}
              >
                {item[0]}
              </li>
            </Link>
          </div>
        ))}
      </ul>
    </nav >
  );
};

export default CustomNav;