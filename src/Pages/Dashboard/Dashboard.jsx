import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { selectorAuth } from "../../redux/auth/selector";
import { logout } from "../../redux/auth/slice";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const { username } = useSelector(selectorAuth);

  const handleLogout = () => {
    console.log("Need dispath logout action");
    dispath(logout());
  };

  const getItem = (label, key, icon, children) => {
    return {
      key,
      icon,
      children,
      label,
      onClick: (params) => {
        if (params.key == 1) {
          navigate("/dashboard/vendor", { replace: true });
        }

        if (params.key == 2) {
          navigate("/dashboard/printer", { replace: true });
        }

        if (params.key == 3) {
          navigate("/dashboard/ou", { replace: true });
        }

        if (params.key == 4) {
          navigate("/dashboard/bl", { replace: true });
        }

        if (params.key == 5) {
          navigate("/dashboard/employee", { replace: true });
        }

        if (params.key == 6) {
          navigate("/dashboard/doctype", { replace: true });
        }

        if (params.key == 7) {
          navigate("/dashboard/ctrstatustype", { replace: true });
        }

        if (params.key == 8) {
          navigate("/dashboard/decomcause", { replace: true });
        }

        if (params.key == 9) {
          navigate("/dashboard/ctrmodel", { replace: true });
        }

        if (params.key == 10) {
          navigate("/dashboard/doc", { replace: true });
        }

        if (params.key == 11) {
          navigate("/dashboard/ctrshowcase", { replace: true });
        }
      },
    };
  };

  const items = [
    getItem("Vendors", "1", <PieChartOutlined />),
    getItem("Printers", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
      getItem("Ous", "3"),
      getItem("Bis line", "4"),
      getItem("Employee", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
      getItem("Doc types", "6"),
      getItem("Ctr status types", "7"),
      getItem("Decom cause", "8"),
    ]),
    getItem("Ctr models", "9", <FileOutlined />),
    getItem("Docs", "10"),
    getItem("Ctr showcase", "11"),
  ];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className='logo' />
        <Menu
          theme='dark'
          defaultSelectedKeys={["1"]}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='site-layout-background'
          style={{
            padding: 0,
          }}
        >
          <div
            style={{ color: "white", textAlign: "right", paddingRight: "20px" }}
          >
            <Button type='link' onClick={() => handleLogout()}>
              Logout
            </Button>
            <Button type='primary' shape='circle' size='large'>
              {username.toUpperCase().slice(0, 1)}
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className='site-layout-background'
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
