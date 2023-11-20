import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VarNav from "./components/Menu/VarNavbar";
import HorNav from "./components/Menu/HoriNavbar";
import "./index.scss";
import Chart from "./components/Card/chart.js";


function Dashboard() {
  return <h2>Dashboard Page</h2>;
}

function App() {
  const verticalNavItems = [
    ["Dashboard", "./img/dashboard.png"],
    ["Account", "./img/account.png"],
    ["Payroll", "./img/payroll.png"],
    ["Reports", "./img/reports.png"],
    ["Advisor", "./img/advisor.png"],
    ["Contacts", "./img/contacts.png"]
  ];
  const searchbar = <input type="text" placeholder="Search" />;

  return (
    
      <Router>
    <div>
      <HorNav searchbar={searchbar} />
      <div style={{ display: "flex" }}>
        <VarNav li={verticalNavItems} />
        <Routes >
        {verticalNavItems.map((item, index) => (
              <Route key={index} path={`/${item[0].toLowerCase()}`} element={<Chart />} />
            ))}
          </Routes >
      </div>
    </div>
    </Router>
  
  );
}


export default App;
