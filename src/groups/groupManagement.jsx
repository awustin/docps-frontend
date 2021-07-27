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
import GroupSearchPane from './groupSearchPane';
import GroupCreateForm from './groupCreateForm';

class GroupManagement extends React.Component {
    render() {
        const { user } = this.props
        const { Title, Paragraph, Text } = Typography
				const { TabPane } = Tabs
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                <Breadcrumb.Item>{user.id}</Breadcrumb.Item>
                <Breadcrumb.Item>Gestión de grupos</Breadcrumb.Item>
            </Breadcrumb>						
						<div className="group-admin-navigation" style={{margin: "50px"}}>
							<Row>
									<Col flex="1 0 25%">
											<Tooltip title="Atrás">
													<LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.goBack()}}/>
											</Tooltip>
									</Col>
							</Row>
						</div>
						<div className="group-admin-container" style={{margin: "50px"}}>
							<Title level={2} style={{ marginBlockEnd:"0px" }}>Gestión de grupos</Title>
							<Divider/>
							<Tabs defaultActiveKey="search">
								<TabPane key="search" tab={<><SearchOutlined />Buscar grupos</>}>
									<GroupSearchPane
										user={user}
									/>									
								</TabPane>
								<TabPane key="create" tab={<><UserAddOutlined />Crear grupo</>}>
									<GroupCreateForm
										user={user}
									/>
								</TabPane>
							</Tabs>
						</div>
            </>
        );
    }
}

export default withRouter(GroupManagement);