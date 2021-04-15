import React from "react";
import { Router, BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { Spin } from "antd";

const HomeCompontent = React.lazy(() => import("../home"));

const Blog = (props) => {
  return (
    <div>
      <p>Blog</p>
      <div style={{ width: 200, height: 200, background: "red" }}></div>
      <Link to="/home/blog/home">home/blog/home</Link>
      {props.children}
    </div>
  );
};

export default Blog;
