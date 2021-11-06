import {
	LeftCircleOutlined
} from '@ant-design/icons';
import {
	Breadcrumb, Col, Divider, Row, Tooltip, Typography
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import UserList from './userList';

class UserManagement extends React.Component {
	render() {
		const { user } = this.props
		const { Title } = Typography
		return (
			<>
				<Breadcrumb>
					<Breadcrumb.Item>Usuario</Breadcrumb.Item>
					<Breadcrumb.Item>{user.id}</Breadcrumb.Item>
					<Breadcrumb.Item>Gestión de usuarios</Breadcrumb.Item>
				</Breadcrumb>
				<div className="navigation">
					<Row>
						<Col flex="1 0 25%">
							<Tooltip title="Atrás">
								<LeftCircleOutlined style={{ fontSize: "200%" }} onClick={() => { this.props.history.goBack() }} />
							</Tooltip>
						</Col>
					</Row>
				</div>
				<div className="container">
					<Title level={2} style={{ marginBlockEnd: "0px" }}>Gestión de usuarios</Title>
					<Divider />
					<UserList
						user={user}
					/>
				</div>
			</>
		);
	}
}

export default withRouter(UserManagement);