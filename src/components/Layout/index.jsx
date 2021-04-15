import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "antd";
import routerPath from "@/router/routerPath";
import authUtils from "@/utils/authUtils";
import Header from "../Header";
import LeftMenu from "../LeftMenu";
import Content from "../Content";
import "./index.less";

const LayoutCom = (props) => {
  useEffect(() => {
    // console.log(routerPath);
    // console.log(props);
  }, []);

  useEffect(() => {
    console.log(1);
  }, [authUtils.getSubMenu()]);

  return (
    <Layout>
      <Header routerPath={routerPath} />
      <Layout>
        <LeftMenu />
        <Content {...props} />
      </Layout>
    </Layout>
  );
};

export default withRouter(LayoutCom);
// export default LayoutCom;
