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
	TeamOutlined
} from '@ant-design/icons';


const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    collapsed: false,
		menuOptions: 
		[
			{key:'user', label:'Usuarios', icon:<UserOutlined style={{ fontSize: '150%'}}/>, toPath:'/user'},
			{key:'groups', label:'Grupos', icon:<TeamOutlined style={{ fontSize: '150%'}}/>, toPath:'/groups/search'},
			{key:'projects', label:'Proyectos', icon:<FolderOutlined style={{ fontSize: '150%'}}/>, toPath:'/projects/search'},
			{key:'testplans', label:'Planes de prueba', icon:<ExperimentOutlined style={{ fontSize: '150%'}}/>, toPath:'/testplans/search'},
			{key:'reports', label:'Reportes', icon:<BarChartOutlined style={{ fontSize: '150%'}}/>, toPath:'/reports'}
		]
  };

  componentDidUpdate() {
    const { collapsed } = this.state
    if(('location' in this.props.children._self.props) && collapsed === false)
    {
      let pathname = this.props.children._self.props.location.pathname 
      if(pathname.includes("workspace"))
      {
        this.setState({ collapsed: true })
      }
    }
  }
  
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { user } = this.props;
    const { collapsed, menuOptions } = this.state;
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width='25vw' collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Menu theme="dark" mode="inline">
							{menuOptions.map(e=>(<Menu.Item key={e.key+'Custom'} icon={e.icon}><Link to={e.toPath}>{e.label}</Link></Menu.Item>))}
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-container" style={{ padding: 24, minHeight: 360 }}>
                { this.props.children }
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>DOCPS 2021</Footer>
        </Layout>
        </Layout>
      </div>
    );
  }
}

export default hot(module)(AppLayout);