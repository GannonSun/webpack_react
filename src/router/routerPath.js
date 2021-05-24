import React from "react";

const ComponentsIndex = React.lazy(() => import("@/pages/components"));
const ComponentIndex = React.lazy(() => import("@/pages/components/component"));

const path = [
  {
    name: "components",
    alias: "组件类",
    path: "/components",
    component: ComponentsIndex,
    children: [
      {
        name: "component",
        alias: "Component",
        path: "/components/component",
        component: ComponentIndex,
      },
    ],
  },
];

export default path;
