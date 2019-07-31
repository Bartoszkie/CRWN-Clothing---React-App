import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
    //musimy dodać funkcjonalność router-react poprzez opakowanie <App/> BrowserRouter
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
