import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Layout } from "antd";
import Breadcrumb from "../Breadcurmb";
import authUtils from "@/utils/authUtils";
import Loading from "@/components/Loading";
import LeftMenu from "../LeftMenu";
import "./index.less";

const { Content } = Layout;

const ContentCom = ({ name }) => {
  const leftMenu = authUtils.getLeftMenu(name);
  const { path, children } = authUtils.getSubMenuItem(name);

  return (
    <>
      <LeftMenu leftMenu={leftMenu} />
      <Layout style={{ padding: "0 24px 24px", overflowY: 'auto' }}>
        <Breadcrumb />
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            flexShrink: 0,
          }}
        >
          <React.Suspense fallback={<Loading />}>
            <Switch>
              {authUtils.renderRouter(children)}
              <Redirect from={path} to={authUtils.getRootRedirect(children)} />
            </Switch>
          </React.Suspense>
        </Content>
      </Layout>
    </>
  );
};

export default ContentCom;
