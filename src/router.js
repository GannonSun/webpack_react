import React from "react";
import { Switch, Route, BrowserRouter, Link, Redirect } from "react-router-dom";
import { Divider, Spin } from "antd";
import Layout from "./components/Layout";
import routerPath from "./router/routerPath";

const HomeCompontent = React.lazy(() => import("./home"));
const BlogCompontent = React.lazy(() => import("./blog"));

const AppRouter = () => {
  const getRootDirect = () => {
    if (routerPath[0].children) {
      return routerPath[0].children[0].path;
    }
    return routerPath[0].path;
  };

  const diguiRouter = (routers) => {
    return (
      routers &&
      routers.map((router) => {
        if (router.children && router.children.length) {
          return (
            <router.component
              key={router.path}
              path={router.path}
              component={router.component}
            >
              <Switch>{diguiRouter(router.children)}</Switch>
            </router.component>
          );
        } else {
          return (
            <Route
              key={router.path}
              path={router.path}
              component={router.component}
            />
          );
        }
      })
    );
  };

  return (
    <BrowserRouter>
      <Layout>
        {/* Switch只显示一个组件。加exact表示精确匹配。如果不加exact，/xxx也会匹配到 */}
        <React.Suspense fallback={<Spin />}>
          <Switch>
            {diguiRouter(routerPath)}
            <Redirect to={getRootDirect()} />
          </Switch>
        </React.Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
