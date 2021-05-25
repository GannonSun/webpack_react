import React from "react";
import { Switch, Route, BrowserRouter, Link, Redirect } from "react-router-dom";
import { Divider, Spin } from "antd";
import Layout from "./components/Layout";
import routerPath from "./router/routerPath";

const HomeCompontent = React.lazy(() => import("./home"));
const BlogCompontent = React.lazy(() => import("./blog"));
const NoFound = React.lazy(() => import("./pages/404"));

const AppRouter = () => {
  const diguiRouter = (routers, needLayout = false) => {
    return (
      routers &&
      routers.map((router) => {
        if (router.children && router.children.length) {
          return (
            <Route
              key={router.path}
              exact={router.exact}
              path={router.path}
            >
              <Switch>
                {diguiRouter(router.children)}
                <Redirect from={router.path} to={router.children[0].path} />
              </Switch>
            </Route>
          );
        } else {
          return (
            <Route
              key={router.path}
              exact={router.exact}
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
        <ul>
          <li>
            <Link to="/home">home</Link>
          </li>
          <li>
            <Link to="/blog">blog</Link>
          </li>
        </ul>
        <Divider />
        {/* Switch只显示一个组件。加exact表示精确匹配。如果不加exact，/xxx也会匹配到 */}
        <React.Suspense fallback={<Spin />}>
          <Switch>
            {/* <Route path="/home">
              <Switch>
                <Route path="/home/blog">
                  <Switch>
                    <Route path="/home/blog/home" component={HomeCompontent} />
                    <Route path="/home/blog/blog" component={BlogCompontent} />
                    <Redirect from="/home" to="/home/blog/home" />
                  </Switch>
                </Route>
                <Redirect from="/home" to="/home/blog" />
              </Switch>
            </Route>
            <Route path="/blog" component={BlogCompontent} />
            <Route path="/*" component={NoFound} /> */}

            {diguiRouter(routerPath, true)}
            {routerPath.length ? <Redirect to={routerPath[0].path} /> : null}
          </Switch>
        </React.Suspense>
      </Layout>
    </BrowserRouter>
  );
};

export default AppRouter;
