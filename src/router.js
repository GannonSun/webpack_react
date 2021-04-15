import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Divider, Spin } from "antd";
import routerPath from "./router/routerPath";

const HomeCompontent = React.lazy(() => import("./home"));
const BlogCompontent = React.lazy(() => import("./blog"));

console.log(routerPath);

const AppRouter = () => {
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

  console.log(diguiRouter(routerPath));

  return (
    <div>
      <BrowserRouter>
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
            {/* <HomeCompontent path="/home" component={HomeCompontent}>
            <Switch>
              <BlogCompontent path="/home/blog" component={BlogCompontent}>
                <Route path="/home/blog/home" component={HomeCompontent} />
              </BlogCompontent>
            </Switch>
          </HomeCompontent>
          <Route path="/blog" component={BlogCompontent} /> */}
            {diguiRouter(routerPath)}
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
