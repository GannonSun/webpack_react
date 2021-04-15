import React from "react";
import ReactDom from "react-dom";
import { AppContainer } from "react-hot-loader";
import Layout from "./components/Layout";
import Router from "./router";

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <Layout>
        <RootElement />
      </Layout>
    </AppContainer>,
    document.getElementById("app")
  );
}

renderWithHotReload(Router);

if (module.hot) {
  module.hot.accept("./router", () => {
    const Router = require("./router").default;
    renderWithHotReload(Router);
  });
}