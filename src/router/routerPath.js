import React from "react";

const HomeCompontent = React.lazy(() => import("@/home"));
const BlogCompontent = React.lazy(() => import("@/blog"));

const path = [
  {
    path: "/home",
    component: HomeCompontent,
    children: [
      {
        path: "/home/blog",
        component: BlogCompontent,
        children: [
          {
            path: "/home/blog/home",
            component: HomeCompontent,
          },
        ],
      },
    ],
  },
  {
    path: "/blog",
    component: BlogCompontent,
  },
];

export default path;
