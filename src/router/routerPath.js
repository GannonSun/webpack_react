import React from "react";

const HomeCompontent = React.lazy(() => import("@/home"));
const BlogCompontent = React.lazy(() => import("@/blog"));

const path = [
  {
    name: "home",
    alias: "家",
    path: "/home",
    component: HomeCompontent,
    children: [
      {
        alias: "首页博客",
        path: "/home/blog",
        component: BlogCompontent,
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
];

export default path;
