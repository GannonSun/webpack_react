import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import routerPath from "@/router/routerPath";
import authUtils from "@/utils/authUtils";
import Header from "../Header";
import LeftMenu from "../LeftMenu";
import Content from "../Content";
import "./index.less";

const LayoutCom = (props) => {
  const [breadInfo, setBreadInfo] = useState([
    routerPath[0]?.alias ?? "",
    routerPath[0]?.children[0]?.alias ?? "",
  ]);

  const clickSubMenu = (e) => {
    setBreadInfo(e.keyPath.reverse());
  };

  return (
    <Layout>
      <Header routerPath={routerPath} />
      <Layout>
        <LeftMenu clickSubMenu={clickSubMenu} />
        <Content {...props} breadInfo={breadInfo} />
      </Layout>
    </Layout>
  );
};

export default LayoutCom;
