import routerPath from "../router/routerPath";

const authUtils = (() => {
  return {
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
