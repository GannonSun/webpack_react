import React, { useEffect, useState } from "react";
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

const LeftMenu = (props) => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    authUtils.setSubMenu(window.location.pathname.split("/")[1]);
    setMenu(authUtils.getSubMenu());
  }, []);

  useEffect(() => {
    console.log("menu", menu);
  }, [menu]);

  const renderSubMenu = (router = menu) => {
    return (
      router &&
      router.map((item) => {
        if (item.children && item.children.length) {
          return (
            <SubMenu key={item.path} icon={<UserOutlined />} title={item.alias}>
              {renderSubMenu(item.children)}
            </SubMenu>
          );
        } else {
          return <Menu.Item key={item.path}>{item.alias}</Menu.Item>;
        }
      })
    );
  };

  const handleClickSubMenu = (e) => {
    console.log(e);
  };

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        onClick={handleClickSubMenu}
        style={{ height: "100%", borderRight: 0 }}
      >
        {renderSubMenu()}
      </Menu>
    </Sider>
  );
};

export default LeftMenu;
