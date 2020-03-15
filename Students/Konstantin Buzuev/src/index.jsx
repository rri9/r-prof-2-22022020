import React from "react";
import ReactDom from "react-dom";
import "bootstrap";

import { Provider } from "react-redux";
import initStore, { history } from "./store/store.js";
import Router from "./router/router.jsx";
import { ConnectedRouter } from "connected-react-router";
//import { BrowserRouter } from "react-router-dom";
let user = "Constantine";

ReactDom.render(
  <Provider store={initStore()}>
    <ConnectedRouter history={history}>
      <Router user={user} />
    </ConnectedRouter>
  </Provider>,

  document.getElementById("app")
);
