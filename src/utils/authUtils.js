import React from "react";
import { Route, Redirect } from "react-router";
import Loading from "@/components/Loading";
import routerPath from "../router/routerPath";

const authUtils = (() => {
  let dynamicRouter = { newModules: [] };

  return {
    clearDynamicRouter: () => {
      dynamicRouter.newModules.length = 0;
    },

    setDynamicRouter: (data) => {
      authUtils.clearDynamicRouter();
      if (data) {
        for (let i in data) {
          dynamicRouter.newModules.push(data[i]);
        }
      }
    },

    testSetDynamicRouter: () => {
      authUtils.clearDynamicRouter();
      if (routerPath) {
        for (let i in routerPath) {
          dynamicRouter.newModules.push(routerPath[i]);
        }
      }
    },

    getDynamicRouter: () => {
      return dynamicRouter;
    },

    renderRouter: (router, needNoFound = false) => {
      if (!(router && router.length)) return;
      const routers = router.map((item) => {
        const RouteCom = React.lazy(() =>
          import(`@/${item.path?.slice(1) ?? ""}`)
        );
        return needNoFound ? (
          <Route
            key={item.path}
            exact={item.exact}
            path={item.path}
            component={RouteCom}
            routes={item.children}
          />
        ) : (
          <RouteCom
            key={item.path}
            exact={item.exact}
            path={item.path}
            routes={item.children}
          />
        );
      });
      const RedirectAs404 = ({ location }) => (
        <Redirect
          to={Object.assign({}, location, { state: { is404: true } })}
        />
      );
      const arr = needNoFound
        ? [<Route key="needNoFound" component={RedirectAs404} />]
        : [];
      return [...routers, ...arr];
    },

    getRootRedirectName: (modules) => {
      if (modules[0].children) {
        return authUtils.getRootRedirectName(modules[0].children);
      }
      return modules[0].name;
    },

    getRootRedirect: (modules) => {
      if (modules[0].children) {
        return authUtils.getRootRedirect(modules[0].children);
      }
      return modules[0].path;
    },

    renderRedirect: (router) => {
      if (!(router && router.length)) return;
      return router.map((item) => {
        console.log(item.path, authUtils.getRootRedirect([item]));
        return (
          <Route
            exact
            key={item.path}
            path={item.path}
            render={() => (
              <Redirect to={authUtils.getRootRedirect([item])}></Redirect>
            )}
          />
        );
      });
    },

    getLeftMenu: (name) => {
      return (
        dynamicRouter.newModules.find((item) => item.name === name)?.children ??
        []
      );
    },

    getSubMenuItem: (name) => {
      let mod = { path: "", children: [] };
      const res = dynamicRouter.newModules.find((item) => item.name === name);
      if (res) {
        mod = {
          path: res.path,
          children: res.children,
        };
      }
      return {
        ...mod,
      };
    },

    getSubMenu: () => {
      return localStorage.getItem("subMenu")
        ? JSON.parse(localStorage.getItem("subMenu"))
        : [];
    },

    setSubMenu: (path) => {
      const subRouter =
        routerPath.find((item) => item.path === path)?.children ?? [];
      localStorage.setItem("subMenu", JSON.stringify(subRouter));
    },

    getActiveMenu: (menu) => {
      const activeMenuItem = menu.find((item) =>
        window.location.pathname.includes(item.path)
      );
      const openKeys = [];
      const selectedKeys = [];
      if (activeMenuItem) {
        if (activeMenuItem.children) {
          openKeys.push(activeMenuItem.path);
          const selectedMenuItem = activeMenuItem.children.find((item) =>
            window.location.pathname.includes(item.path)
          );
          if (selectedMenuItem) {
            selectedKeys.push(selectedMenuItem.path);
          }
        } else {
          selectedKeys.push(activeMenuItem.path);
        }
      }
      return {
        openKeys,
        selectedKeys,
      };
    },
  };
})();

export default authUtils;
