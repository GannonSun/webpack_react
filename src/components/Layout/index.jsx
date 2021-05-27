import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Layout } from "antd";
import routerPath, { routerConst } from "@/router/routerPath";
import authUtils from "@/utils/authUtils";
import Header from "../Header";
import LeftMenu from "../LeftMenu";
import Content from "../Content";
import "./index.less";

const componentsMap = {
  frontEnd: React.lazy(() => import('@/pages/frontEnd')),
  backEnd: React.lazy(() => import('@/pages/backEnd')),
  404: React.lazy(() => import('@/pages/404'))
}

const LayoutCom = (props) => {
  const [renderKey, setRenderKey] = useState(0);
  const [leftMenu, setLeftMenu] = useState(authUtils.getSubMenu());

  const { dynamicRouter } = authUtils.getDynamicRouter();

  useEffect(() => {
    // 初始化
    authUtils.setDynamicRouter(routerPath);
    setRenderKey(renderKey + 1);
  }, []);

  useEffect(() => {
    // 窗外的天气
  }, [leftMenu]);

  const getRootRedirect = (modules) => {
    if (modules[0].children) {
      return getRootRedirect(modules[0].children);
    }
    return modules[0].path;
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header routerPath={routerPath} handleSetLeftMenu={(data) => setLeftMenu(data)} />
      <Layout>
        {/* {leftMenu.length ? <LeftMenu leftMenu={leftMenu} /> : null} */}
        {/* <Content {...props} /> */}
        {
          dynamicRouter.length > 0 ? (
            <Switch>
              {routerConst.root === getRootRedirect(dynamicRouter) ? null : (
                <Route
                  exact
                  path={routerConst.root}
                  render={() => <Redirect to={getRootRedirect(dynamicRouter)}></Redirect>}
                />
              )}
              {authUtils.renderRouter(dynamicRouter, componentsMap)}
            </Switch>
          ) : null
        }
      </Layout>
    </Layout>
  );
};

export default withRouter(LayoutCom);
// export default LayoutCom;
