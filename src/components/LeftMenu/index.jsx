import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import authUtils from "@/utils/authUtils";
import "./index.less";

const { SubMenu } = Menu;
const { Sider } = Layout;

const LeftMenu = ({ leftMenu }) => {
  const { openKeys, selectedKeys } = authUtils.getActiveMenu(leftMenu);

  const renderSubMenu = (menu) => {
    return (
      menu &&
      menu.map((item) => {
        if (item.children && item.children.length) {
          return (
            <SubMenu key={item.path} icon={<UserOutlined />} title={item.alias}>
              {renderSubMenu(item.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.path}>
              <Link to={item.path}>{item.alias}</Link>
            </Menu.Item>
          );
        }
      })
    );
  };

  const handleOpenSubMenu = (keys) => {
    console.log(keys);
  }

  const handleSelectSubMenu = (e) => {
    console.log(e);
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        theme="dark"
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={handleOpenSubMenu}
        onSelect={handleSelectSubMenu}
        style={{ height: "100%", borderRight: 0 }}
      >
        {renderSubMenu(leftMenu)}
      </Menu>
    </Sider>
  );
};

export default LeftMenu;
