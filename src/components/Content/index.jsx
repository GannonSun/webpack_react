import React from "react";
import { Switch } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import authUtils from "@/utils/authUtils";
import LeftMenu from "../LeftMenu";
import "./index.less";

const { Content } = Layout;

const ContentCom = ({ name, componentsMap }) => {
  const leftMenu = authUtils.getLeftMenu(name);
  const { path, children } = authUtils.getSubMenuItem(name);

  return (
    <>
      <LeftMenu leftMenu={leftMenu} />
      <Layout style={{ padding: "0 24px 24px", overflowY: 'auto' }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            flexShrink: 0,
          }}
        >
          <Switch>
            {authUtils.renderRouter(children, componentsMap)}
          </Switch>
        </Content>
      </Layout>
    </>
  );
};

export default ContentCom;
