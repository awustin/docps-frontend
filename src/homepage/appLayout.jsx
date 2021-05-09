import { hot } from 'react-hot-loader';
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  BarChartOutlined,
  ExperimentOutlined,
  FileDoneOutlined,
  FolderOutlined
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
              <Menu.Item key="1" icon={<UserOutlined />}>
                Usuario
              </Menu.Item>
              <SubMenu key="sub1" icon={<FolderOutlined />} title="Proyectos">
                <Menu.Item key="2">Crear proyecto</Menu.Item>
                <Menu.Item key="3">Buscar proyectos</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<ExperimentOutlined />} title="Planes de prueba">
                <Menu.Item key="4">Crear plan de prueba</Menu.Item>
                <Menu.Item key="5">Buscar planes de prueba</Menu.Item>
                <Menu.Item key="6">Exportar</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<FileDoneOutlined />} title="Ejecuciones">
                <Menu.Item key="7">Crear Ejecucion</Menu.Item>
                <Menu.Item key="8">Listar Ejecuciones</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<BarChartOutlined />}>
                Reportes
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Contenido
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