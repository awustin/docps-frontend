import { withRouter } from "react-router";
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
    Tooltip,
		Card,
		Avatar,
		Space,
		Tabs
} from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    LeftCircleOutlined,
		AntDesignOutlined,
		SearchOutlined,
		UserAddOutlined
} from '@ant-design/icons';
import UserBadge from './userBadge';
import UserSearchPane from './userSearchNEW';

class UserManagement extends React.Component {
    render() {
        const { user } = this.props
        const { Title, Paragraph, Text } = Typography
				const { TabPane } = Tabs
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                <Breadcrumb.Item>{user.id}</Breadcrumb.Item>
                <Breadcrumb.Item>Gestión de usuarios</Breadcrumb.Item>
            </Breadcrumb>						
						<div className="user-admin-navigation" style={{margin: "50px"}}>
							<Row>
									<Col flex="1 0 25%">
											<Tooltip title="Atrás">
													<LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.goBack()}}/>
											</Tooltip>
									</Col>
							</Row>
						</div>
						<div className="user-admin-container" style={{margin: "50px"}}>
							<Title level={4} style={{ marginBlockEnd:"0px" }}>Gestión de usuarios</Title>
							<Divider/>
							<Tabs defaultActiveKey="search">
								<TabPane key="search" tab={<><SearchOutlined />Buscar usuarios</>}>
									<UserSearchPane
											user={user}
									/>									
								</TabPane>
								<TabPane key="create" tab={<><UserAddOutlined />Crear usuario</>}>
								</TabPane>
							</Tabs>
						</div>
            </>
        );
    }
}

export default withRouter(UserManagement);