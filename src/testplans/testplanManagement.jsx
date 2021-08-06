import React from 'react';
import { withRouter } from "react-router";
import { 
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
    Tooltip,
		Tabs
} from 'antd';
import {
    LeftCircleOutlined,
		SearchOutlined,
		FolderAddOutlined
} from '@ant-design/icons';
import TestplanSearchPane from './testplanSearchPane';

class TestplanManagement extends React.Component {
    render() {
		const { user } = this.props
		const { Title } = Typography
		const { TabPane } = Tabs
		return(
		<>
		<Breadcrumb>
			<Breadcrumb.Item>Usuario</Breadcrumb.Item>
			<Breadcrumb.Item>{user.id}</Breadcrumb.Item>
			<Breadcrumb.Item>Gestión de planes de pruebas</Breadcrumb.Item>
		</Breadcrumb>						
		<div className="navigation" style={{margin: "50px"}}>
			<Row>
				<Col flex="1 0 25%">
				<Tooltip title="Atrás">
					<LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.goBack()}}/>
				</Tooltip>
				</Col>
			</Row>
		</div>
		<div className="management-container" style={{margin: "50px"}}>
			<Title level={2} style={{ marginBlockEnd:"0px" }}>Gestión de planes de pruebas</Title>
			<Divider/>
			<Tabs defaultActiveKey="search">
				<TabPane key="search" tab={<><SearchOutlined />Buscar planes de pruebas</>}>
					<TestplanSearchPane
						user={user}
					/>
				</TabPane>
				<TabPane key="create" tab={<><FolderAddOutlined />Crear plan de pruebas</>}>
					Crear
				</TabPane>
			</Tabs>
		</div>
		</>
		);
		}
}

export default withRouter(TestplanManagement);