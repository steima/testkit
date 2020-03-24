import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./App";

for(let element of document.getElementsByTagName("body")) {
    element.removeAttribute("class");
    element.classList.add("desk");
}

ReactDOM.render(
    <App />,
    document.getElementById("content")
);