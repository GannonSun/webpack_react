import React from "react";

const HomeCompontent = React.lazy(() => import("@/home"));
const BlogCompontent = React.lazy(() => import("@/blog"));
const NoFound = React.lazy(() => import("@/pages/404"));

const path = [
  {
    name: "home",
    alias: "家",
    path: "/home",
    children: [
      {
        alias: "首页博客",
        path: "/home/blog",
        children: [
          {
            alias: "首页博客首页",
            path: "/home/blog/home",
            component: HomeCompontent,
          },
        ],
      },
    ],
  },
  {
    name: "blog",
    alias: "博客",
    path: "/blog",
    component: BlogCompontent,
  },
  {
    name: "404",
    path: "/*",
    component: NoFound,
  },
];

export default path;
