import React from "react";
import ReactDom from "react-dom";
import "bootstrap";

import Messages from "./components/MessagesField/MessagesField.jsx";

let user = "Darth Vader";
//<Messages usr={user} />

ReactDom.render(<Messages usr={user} />, document.getElementById("app"));
