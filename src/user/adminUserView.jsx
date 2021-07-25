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
		Space
} from 'antd';
import {
    SettingTwoTone,
    UserOutlined,
    TeamOutlined,
    UsergroupAddOutlined,
		AntDesignOutlined
} from '@ant-design/icons';
import UserBadge from './userBadge';

class AdminUserView extends React.Component {
    render() {
        const { user } = this.props
        const { Title, Paragraph, Text } = Typography
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>                
                <Breadcrumb.Item>{user.id}</Breadcrumb.Item>
            </Breadcrumb>            
            <div className="user-view-container" style={{margin: "50px"}}>
                <Title level={3}>¡Bienvenido!</Title>
                <UserBadge
                    user={user}
                />
                <Divider orientation="left">
                    <Text type="secondary">Administrar usuarios y grupos</Text>
                </Divider>
								<Row gutter={16} style={{ marginBlockStart:"5%" }}>
									<Col span={12}>
										<Link to={{ pathname:"/user/admin"}}>
											<Card
												hoverable
												style={{ textAlign: "center" }}
												title="Gestión de usuarios"
											>
													<Space direction="vertical">
														<UserOutlined															
															style={{ fontSize:"400%", color:"#2fcade"}}
														/>
													</Space>
											</Card>
										</Link>
									</Col>
									<Col span={12}>
										<Link to={{ pathname:"/groups/search"}}>
											<Card
												hoverable
												style={{ textAlign: "center" }}
												title="Gestión de grupos"
											>
												<Space direction="vertical">
													<Space direction="vertical">
														<TeamOutlined															
															style={{ fontSize:"400%", color:"#deaf2f"}}
														/>
													</Space>
												</Space>
											</Card>
										</Link>
									</Col>
								</Row>                
            </div>
            </>
        );
    }
}

export default withRouter(AdminUserView);