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
	TeamOutlined,
	HomeOutlined,
	PoweroffOutlined
} from '@ant-design/icons';


const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
		this.menuOnClick = this.menuOnClick.bind(this)
  }

  state = {
    collapsed: false,
		menuOptions: 
		[
			{key:'home', label:'Home', icon:<HomeOutlined style={{ fontSize: '150%'}}/>, toPath:'/home', onlyAdmin: false},
			{key:'user', label:'Usuarios', icon:<UserOutlined style={{ fontSize: '150%'}}/>, toPath:'/user/admin', onlyAdmin: true},
			{key:'groups', label:'Grupos', icon:<TeamOutlined style={{ fontSize: '150%'}}/>, toPath:'/groups/admin', onlyAdmin: true},
			{key:'projects', label:'Proyectos', icon:<FolderOutlined style={{ fontSize: '150%'}}/>, toPath:'/projects/manage', onlyAdmin: false},
			{key:'testplans', label:'Planes de prueba', icon:<ExperimentOutlined style={{ fontSize: '150%'}}/>, toPath:'/testplans/manage', onlyAdmin: false},
			{key:'reports', label:'Reportes', icon:<BarChartOutlined style={{ fontSize: '150%'}}/>, toPath:'/reports', onlyAdmin: false}
		],
		otherOptions:
		[
			{key:'logout', label:'Cerrar Sesión', icon:<PoweroffOutlined style={{ fontSize: '150%'}}/>, onlyAdmin: false}
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
	
	menuOnClick(option) {
		if(option.key === 'logout')
			alert('Log out')
	}

  render() {
    const { user } = this.props;
    const { collapsed, menuOptions, otherOptions } = this.state;
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width='25vw' collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Menu theme="dark" mode="inline" onClick={this.menuOnClick}>
							{
								menuOptions
								.filter( item => !item.onlyAdmin || user.isAdmin )
								.map( e => (<Menu.Item key={e.key} icon={e.icon}><Link to={e.toPath}>{e.label}</Link></Menu.Item>) )
							}
							{								
								otherOptions
								.filter( item => !item.onlyAdmin || user.isAdmin )
								.map( e => (<Menu.Item key={e.key} icon={e.icon}>{e.label}</Menu.Item>) )
							}
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