import React from "react";
import ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./app";
import "./index.less";

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <RootElement />
    </AppContainer>,
    document.getElementById("app")
  );
}

renderWithHotReload(App);

if (module.hot) {
  module.hot.accept("./app", () => {
    const Router = require("./app").default;
    renderWithHotReload(Router);
  });
}
