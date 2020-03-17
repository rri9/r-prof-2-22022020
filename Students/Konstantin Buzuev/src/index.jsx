import React from "react";
import ReactDom from "react-dom";
import "bootstrap";

import { Provider } from "react-redux";
import initStore, { history } from "./store/store.js";
import Router from "./router/router.jsx";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = initStore();
let user = "Constantine";

ReactDom.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Router user={user} />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,

  document.getElementById("app")
);
