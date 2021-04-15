import routerPath from "../router/routerPath";

const authUtils = (() => {
  return {
    getSubMenu: () => {
      return localStorage.getItem("subMenu")
        ? JSON.parse(localStorage.getItem("subMenu"))
        : [];
    },

    setSubMenu: (name) => {
      const subRouter =
        routerPath.find((item) => item.name === name)?.children ?? [];
      localStorage.setItem("subMenu", JSON.stringify(subRouter));
    },
  };
})();

export default authUtils;
