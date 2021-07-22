import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import authUtils from "@/utils/authUtils";
import "./index.less";

const { SubMenu } = Menu;
const { Sider } = Layout;

const LeftMenu = ({ leftMenu }) => {
  const { openKeys, selectedKeys } = authUtils.getActiveMenu(leftMenu);

  const [collapsed, setCollapsed] = useState(false);
  const [leftOpenKeys, setLeftOpenKeys] = useState(openKeys);
  const [leftSelectedKeys, setLeftSelectedKeys] = useState(selectedKeys);

  useEffect(() => {
    if (!(leftOpenKeys.length && leftSelectedKeys.length)) {
      setLeftOpenKeys(openKeys);
      setLeftSelectedKeys(selectedKeys);
    }
  }, [openKeys[0], selectedKeys[0]])

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
            <Menu.Item icon={<UserOutlined />} key={item.path}>
              <Link to={item.path}>{item.alias}</Link>
            </Menu.Item>
          );
        }
      })
    );
  };

  const onCollapse = () => {
    setCollapsed(!collapsed);
  }

  const handleOpenChange = (key) => {
    console.log(key)
    setLeftOpenKeys(key);
  }

  const handleSelectChange = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    // if (item.props.parentMenu.isRootMenu) {
    //   setLeftOpenKeys([]);
    // }
    setLeftSelectedKeys(selectedKeys);
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={200}
      className="site-layout-background"
    >
      <Menu
        mode="inline"
        theme="dark"
        openKeys={leftOpenKeys}
        selectedKeys={leftSelectedKeys}
        onOpenChange={handleOpenChange}
        onSelect={handleSelectChange}
      >
        {renderSubMenu(leftMenu)}
      </Menu>
      <div className="collapsedContain" onClick={onCollapse}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'collapsedTrigger',
        })}
      </div>
    </Sider>
  );
};

export default LeftMenu;
