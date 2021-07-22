import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { inject, observer } from "mobx-react";
import authUtils from "@/utils/authUtils";
import "./index.less";

const { Header } = Layout;

let activeMenu = null;

const HeaderCom = ({ routerPath, history, breadcrumb }) => {
  useEffect(() => {
    
  }, []);

  const isActive = (item) => {
    // console.log(history, window.location, item)
    const active = window.location.pathname.includes(item.path);
    if (active && !activeMenu) {
      activeMenu = { path: item.path, title: item.alias };
      breadcrumb.setValue(0, activeMenu);
    }
    return active;
  }

  const renderHeaderMenu = (data) => {
    return (
      data &&
      data.map((router) => {
        return (
          <li
            key={router.path}
            id={router.path}
            className={`${isActive(router) ? 'active' : ''}`}
            onClick={handleClickMenu}
          >
            {router.alias}
          </li>
        );
      })
    );
  };

  const handleClickMenu = (e) => {
    const { id, innerText } = e.target;
    history.push(id);
    breadcrumb.setValue(0, { path: id, title: innerText });
  };

  return (
    <Header className="header">
      <div className="logo">
        <img src="https://via.placeholder.com/24x24.png" alt="" />
        <span>xxxxxx科技公司</span>
      </div>
      <div className="header-left">
        <ul>
          {routerPath && routerPath.length > 1 && renderHeaderMenu(routerPath)}
        </ul>
      </div>
    </Header>
  );
};

const mobxCom = inject('breadcrumb')(observer(HeaderCom));

export default withRouter(mobxCom);
