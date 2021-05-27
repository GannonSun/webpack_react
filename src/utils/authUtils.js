import React from "react";
import { Route, Redirect } from "react-router";
import routerPath from "../router/routerPath";

const authUtils = (() => {
  let dynamicRouter = [];

  return {
    clearDynamicRouter: () => {
      dynamicRouter.length = 0;
    },

    setDynamicRouter: (data) => {
      authUtils.clearDynamicRouter();
      dynamicRouter = data;
    },

    getDynamicRouter: () => {
      return {
        dynamicRouter,
      };
    },

    renderRouter: (router, componentsMap) => {
      if (!(router && router.length)) return;
      return router.map((item) => {
        const RouteCom = componentsMap[`${item.name}`];
        return (
          <RouteCom
            key={item.path}
            exact={item.exact}
            path={item.path}
            component={componentsMap[item.name]}
            routes={item.children}
          />
        );
      });
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
      return dynamicRouter.find((item) => item.name === name)?.children ?? [];
    },

    getSubMenuItem: (name) => {
      let mod = { path: "", children: [] };
      const res = dynamicRouter.find((item) => item.name === name);
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
        openKeys.push(activeMenuItem.path);
        if (activeMenuItem.children) {
          const selectedMenuItem = activeMenuItem.children.find((item) =>
            window.location.pathname.includes(item.path)
          );
          if (selectedMenuItem) {
            selectedKeys.push(selectedMenuItem.path);
          }
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
