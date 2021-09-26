import { withRouter } from "react-router";
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Row,
    Col,
    Typography,
    Divider,
		Card,
		Space
} from 'antd';
import {
    UserOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import { UsersIso, GroupsIso } from '../CustomIcons2.js';

class AdminUserOptions extends React.Component {
    render() {
        const { user } = this.props
        const { Title, Text } = Typography
        return(
            <>
                <Divider orientation="left">
                    <Text type="secondary">Herramientas de administrador</Text>
                </Divider>
								<Row gutter={16} style={{ marginBlockStart:"1%" }}>
									<Col span={12}>
										<Link to={{ pathname:"/user/admin"}}>
											<Card
												hoverable
												style={{ textAlign: "center" }}
												className="admin-card"
												title="Gestión de usuarios"
											>
													<Space direction="vertical">
														<UsersIso/>
													</Space>
											</Card>
										</Link>
									</Col>
									<Col span={12}>
										<Link to={{ pathname:"/groups/admin"}}>
											<Card
												hoverable
												style={{ textAlign: "center" }}
												className="admin-card"
												title="Gestión de grupos"
											>
												<Space direction="vertical">
													<Space direction="vertical">
														<GroupsIso/>
													</Space>
												</Space>
											</Card>
										</Link>
									</Col>
								</Row>
            </>
        );
    }
}

export default withRouter(AdminUserOptions);