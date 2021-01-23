import React from "react";
import { Router, BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Layout from "./pages/layout/index.tsx";
import Home from "./home";
import Blog from "./blog";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/layout">layout</Link>
        </li>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/blog">blog</Link>
        </li>
      </ul>
      <div>
        {/* Switch只显示一个组件。加exact表示精确匹配。如果不加exact，/xxx也会匹配到 */}
        <Switch>
          <Route exact path="/layout" component={Layout} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/blog" component={Blog} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
