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
  const [leftMenu, setLeftMenu] = useState(authUtils.getSubMenu());

  useEffect(() => {
    // 初始化
  }, []);

  useEffect(() => {
    console.log(1)
  }, [leftMenu]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header routerPath={routerPath} handleSetLeftMenu={(data) => setLeftMenu(data)} />
      <Layout>
        {leftMenu.length ? <LeftMenu leftMenu={leftMenu} /> : null}
        <Content {...props} />
      </Layout>
    </Layout>
  );
};

export default withRouter(LayoutCom);
// export default LayoutCom;
