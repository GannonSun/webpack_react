import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import authUtils from "@/utils/authUtils";
import "./index.less";

const { Header } = Layout;

const HeaderCom = ({ routerPath, handleSetLeftMenu }) => {
  useEffect(() => { }, []);

  const renderHeaderMenu = () => {
    return (
      routerPath &&
      routerPath.map((router) => {
        return (
          <Menu.Item key={router.path}>
            {/* <Link to={router.path}>{router.alias}</Link> */}
            <span>{router.alias}</span>
          </Menu.Item>
        );
      })
    );
  };

  const handleClickMenu = (e) => {
    console.log(e)
    authUtils.setSubMenu(e.key);
    handleSetLeftMenu(authUtils.getSubMenu());
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={handleClickMenu}
      >
        {renderHeaderMenu()}
      </Menu>
    </Header>
  );
};

export default HeaderCom;
