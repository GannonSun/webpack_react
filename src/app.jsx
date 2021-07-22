import React from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { Spin } from "antd";
import routerPath, { routerConst } from "@/router/routerPath";
import Loading from "@/components/Loading";
// import Layout from '@/components/Layout';
import RouterHoc from "@/components/Hoc/routeFilterHoc";

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route path={routerConst.root} component={React.lazy(() => import('@/components/Layout'))} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
};

export default RouterHoc(AppRouter);
