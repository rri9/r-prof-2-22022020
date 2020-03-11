import React from "react";
import ReactDom from "react-dom";
import "bootstrap";

import { Provider } from "react-redux";
import initStore from "./store/store.js";
import Router from "./router/router.jsx";
import { BrowserRouter } from "react-router-dom";
let user = "Constantine";

ReactDom.render(
  <Provider store={initStore()}>
    <BrowserRouter>
      <Router user={user} />
    </BrowserRouter>
  </Provider>,

  document.getElementById("app")
);
