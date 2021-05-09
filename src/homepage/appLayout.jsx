import { hot } from 'react-hot-loader';
import React from 'react';
import { Layout } from 'antd';
import {} from '../';
import SidebarMenu from './sidebarMenu';
import Options from './options';
import Workspace from './workspace';

const { Header, Footer, Sider, Content } = Layout;

class AppLayout extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { user } = this.props;
    return (
      <div>
        User id: {user}
        <Layout>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
          </Layout>
        </Layout>
        <div>
            Log out.
        </div>
      </div>
    );
  }
}

export default hot(module)(AppLayout);