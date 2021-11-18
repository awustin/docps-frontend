import {
  BarChartOutlined,
  ExperimentOutlined,
  FolderOutlined, HomeOutlined,
  PoweroffOutlined, TeamOutlined, UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { withRouter } from "react-router";

const { Header, Sider, Content } = Layout;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
    menuOptions:
      [
        { key: 'home', label: 'Home', icon: <HomeOutlined style={{ fontSize: '150%' }} />, toPath: '/home', roles: [] },
        { key: 'user', label: 'Usuarios', icon: <UserOutlined style={{ fontSize: '150%' }} />, toPath: '/user/admin', roles: ['admin'] },
        { key: 'groups', label: 'Grupos', icon: <TeamOutlined style={{ fontSize: '150%' }} />, toPath: '/groups/admin', roles: ['admin', 'groupAdmin'] },
        { key: 'projects', label: 'Proyectos', icon: <FolderOutlined style={{ fontSize: '150%' }} />, toPath: '/projects/manage', roles: [] },
        { key: 'testplans', label: 'Planes de prueba', icon: <ExperimentOutlined style={{ fontSize: '150%' }} />, toPath: '/testplans/manage', roles: [] },
        { key: 'reports', label: 'Reportes', icon: <BarChartOutlined style={{ fontSize: '150%' }} />, toPath: '/reports', roles: [] }
      ],
    otherOptions:
      [
        { key: 'logout', label: 'Cerrar Sesión', icon: <PoweroffOutlined style={{ fontSize: '150%' }} />, roles: [] }
      ]
  }

  render() {
    const { logout, user } = this.props;
    const { collapsed, menuOptions, otherOptions } = this.state;
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width='15vw' collapsible collapsed={collapsed} onCollapse={collapsed => this.setState({ collapsed })}>
            <Menu>
              {
                menuOptions
                  .filter(i => i.roles.length === 0 || i.roles.includes(user.role))
                  .map(e => (<Menu.Item key={e.key} icon={e.icon} onClick={() => { this.props.history.push(e.toPath) }}>{e.label}</Menu.Item>))
              }
              {
                otherOptions
                  .filter(i => i.roles.length === 0 || i.roles.includes(user.role))
                  .map(e => (<Menu.Item key={e.key} icon={e.icon} onClick={logout}>{e.label}</Menu.Item>))
              }
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content>
              <div className="site-layout-container" style={{ padding: 24, minHeight: 360 }}>
                {this.props.children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(AppLayout);