import { hot } from 'react-hot-loader';
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  FileDoneOutlined,
  FolderOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';


const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    collapsed: false
  };
  
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { user } = this.props;
    const { collapsed } = this.state;
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width='25vw' collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="0" icon={<UserOutlined style={{ fontSize: '150%'}}/>}>
                <Link to="/user">Usuario</Link>
              </Menu.Item>
              <SubMenu key="sub0" icon={<UsergroupAddOutlined style={{ fontSize: '150%'}}/>} title="Grupos">
                <Menu.Item key="1"><Link to="/groups/create">Crear grupo</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub1" icon={<FolderOutlined style={{ fontSize: '150%'}}/>} title="Proyectos">
                <Menu.Item key="3"><Link to="/projects/create">Crear proyecto</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/projects/search">Buscar proyectos</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<ExperimentOutlined style={{ fontSize: '150%'}}/>} title="Planes de prueba">
                <Menu.Item key="5"><Link to="/testplans/create">Crear plan de prueba</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/testplans/search">Buscar planes de prueba</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/testplans/export">Exportar</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<ThunderboltOutlined style={{ fontSize: '150%'}}/>} title="Ejecuciones">
                <Menu.Item key="8"><Link to="/executions/create">Crear Ejecucion</Link></Menu.Item>
                <Menu.Item key="9"><Link to="/executions/view">Listar Ejecuciones</Link></Menu.Item>
              </SubMenu>
              <Menu.Item key="10" icon={<BarChartOutlined style={{ fontSize: '150%'}}/>}>
                <Link to="/reports">Reportes</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-container" style={{ padding: 24, minHeight: 360 }}>
                { this.props.children }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </Layout>
      </div>
    );
  }
}

export default hot(module)(AppLayout);