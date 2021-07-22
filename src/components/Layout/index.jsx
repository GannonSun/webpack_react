import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Layout } from "antd";
import routerPath, { routerConst } from "@/router/routerPath";
import authUtils from "@/utils/authUtils";
import Loading from "@/components/Loading";
import NoFound from "@/pages/404";
import Header from "../Header";
import "./index.less";

const LayoutCom = (props) => {
  const [renderKey, setRenderKey] = useState(0);
  const [leftMenu, setLeftMenu] = useState(authUtils.getSubMenu());

  const { newModules } = authUtils.getDynamicRouter();

  useEffect(() => {
    // 初始化
    authUtils.setDynamicRouter(routerPath);
    setRenderKey(renderKey + 1);
  }, []);

  const getRootRedirect = (modules) => {
    if (modules[0].children) {
      return getRootRedirect(modules[0].children);
    }
    return modules[0].path;
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header routerPath={newModules} handleSetLeftMenu={(data) => setLeftMenu(data)} />
      <Layout>
        <Route render={({ location }) => (
          location.state && location.state.is404 ?
            <NoFound />
            :
            newModules.length > 0 ? (
              <React.Suspense fallback={null}>
                <Switch>
                  {routerConst.root === getRootRedirect(newModules) ? null : (
                    <Route
                      exact
                      path={routerConst.root}
                      render={() => <Redirect to={getRootRedirect(newModules)}></Redirect>}
                    />
                  )}
                  {authUtils.renderRouter(newModules, true)}
                </Switch>
              </React.Suspense>
            ) : null
        )} />
      </Layout>
    </Layout>
  );
};

export default withRouter(LayoutCom);
// export default LayoutCom;
