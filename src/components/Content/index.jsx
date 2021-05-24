import React from "react";
import { Layout, Breadcrumb } from "antd";
import "./index.less";

const { Content } = Layout;

const ContentCom = (props) => {
  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        {props.breadInfo &&
          props.breadInfo.map((bread) => {
            return <Breadcrumb.Item key={bread}>{bread}</Breadcrumb.Item>;
          })}
      </Breadcrumb>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        {props.children}
      </Content>
    </Layout>
  );
};

export default ContentCom;
