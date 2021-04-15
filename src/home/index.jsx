import React from "react";
import { Router, BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { Button } from "antd";
import homeApi from "@/api/code";

const Home = (props) => {
  const handleClickHome = () => {
    homeApi.getGlobalVal().then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <Button type="primary" onClick={handleClickHome}>
        Home
      </Button>
      <p>Home</p>
      <div style={{ width: 200, height: 200, background: "green" }}></div>
      <Link to="/home/blog">home/blog</Link>
      {props.children}
    </div>
  );
};

export default Home;
