// import React from "react";

// import { ColorModeScript } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <StrictMode>
    {/* <ColorModeScript /> */}
    <App />
  </StrictMode>,
  document.getElementById("root")
);
