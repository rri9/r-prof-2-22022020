import React from "react";
import ReactDom from "react-dom";
import "bootstrap";

import Router from "./router/router.jsx";
import { BrowserRouter } from "react-router-dom";
let user = "Constantine";

ReactDom.render(
  <BrowserRouter>
    <Router user={user} />
  </BrowserRouter>,

  document.getElementById("app")
);
