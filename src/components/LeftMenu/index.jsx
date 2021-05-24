import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import authUtils from "@/utils/authUtils";
import routerPath from "@/router/routerPath";
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

  const renderSubMenu = (router) => {
    return (
      router &&
      router.map((item) => {
        if (item.children && item.children.length) {
          return (
            <SubMenu
              key={item.alias}
              icon={<LaptopOutlined />}
              title={item.alias}
            >
              {renderSubMenu(item.children)}
            </SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.alias}>
              <Link to={item.path}>{item.alias}</Link>
            </Menu.Item>
          );
        }
      })
    );
  };

  const handleClickSubMenu = (e) => {
    props.clickSubMenu(e);
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
        {renderSubMenu(routerPath)}
      </Menu>
    </Sider>
  );
};

export default LeftMenu;
