const path = [
  {
    name: "frontEnd",
    alias: "前端",
    path: "/pages/frontEnd",
    children: [
      {
        name: "iReact",
        alias: "React",
        path: "/pages/frontEnd/iReact",
        children: [
          {
            name: "classComponent",
            alias: "类组件",
            exact: true,
            path: "/pages/frontEnd/iReact/classComponent",
          },
          {
            name: "hooksComponent",
            alias: "函数组件",
            exact: true,
            path: "/pages/frontEnd/iReact/hooksComponent",
          },
        ],
      },
      {
        name: "iVue",
        alias: "Vue",
        exact: true,
        path: "/pages/frontEnd/iVue",
      },
    ],
  },
  {
    name: "backEnd",
    alias: "后端",
    path: "/pages/backEnd",
    children: [
      {
        name: "iNode",
        alias: "Node",
        exact: true,
        path: "/pages/backEnd/iNode",
      },
    ],
  },
  {
    name: "404",
    path: "/*",
  },
];

export const routerConst = {
  root: "/",
};

export default path;
