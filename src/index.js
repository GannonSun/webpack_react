import React from "react";
import ReactDom from "react-dom";

// 热加载
import { AppContainer } from "react-hot-loader";

// mobx
import { Provider } from "mobx-react";
import store from "./store";

import App from "./app";
import "./index.less";

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <Provider {...store}>
        <RootElement />
      </Provider>
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
