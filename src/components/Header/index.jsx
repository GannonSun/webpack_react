import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import authUtils from "@/utils/authUtils";
import "./index.less";

const { Header } = Layout;

const HeaderCom = (props) => {
  useEffect(() => {}, []);

  const renderHeaderMenu = () => {
    const { routerPath } = props;
    return (
      routerPath &&
      routerPath.map((router) => {
        return (
          <Menu.Item key={router.path}>
            <Link to={router.path}>{router.alias}</Link>
          </Menu.Item>
        );
      })
    );
  };

  const handleClickMenu = (e) => {
    console.log(e);
    authUtils.setSubMenu(e.key);
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["/home"]}
        onClick={handleClickMenu}
      >
        {renderHeaderMenu()}
      </Menu>
    </Header>
  );
};

export default HeaderCom;
