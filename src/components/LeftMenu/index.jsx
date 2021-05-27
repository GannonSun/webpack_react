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
  console.log(openKeys)

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

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        theme="dark"
        defaultOpenKeys={openKeys}
        defaultSelectedKeys={selectedKeys}
        style={{ height: "100%", borderRight: 0 }}
      >
        {renderSubMenu(leftMenu)}
      </Menu>
    </Sider>
  );
};

export default LeftMenu;
