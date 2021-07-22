import { withRouter } from "react-router";
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
    Space,
		Avatar,
		Select,
		Card,
		Statistic
} from 'antd';
import {
    PlusCircleOutlined,
    EditOutlined,
    SearchOutlined,
    UsergroupAddOutlined,
		AntDesignOutlined,
		ArrowUpOutlined
} from '@ant-design/icons';

class ReportsMainView extends React.Component {
		constructor(props) {
			super(props)
		}
		state = {
			memberCount: undefined,
			avatar: undefined
		}
		
    render() {
        const { user } = this.props
				const { memberCount, avatar } = this.state
        const { Title,Text } = Typography
        const { Option } = Select
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Reportes</Breadcrumb.Item>                
                <Breadcrumb.Item>{user.currentGroup.name}</Breadcrumb.Item>
            </Breadcrumb>            
            <div className="reports-view-container" style={{margin: "50px"}}>
                <Title level={3}>Reportes</Title>
                <Divider/>
                <Row className="group-badge-container" style={{}}>
                    <Col flex="1 0 33%" style={{textAlign:"center",alignSelf:"center"}}>
                        <Avatar
                            size={{ xs: 85, sm: 85, md: 85, lg: 120, xl: 140, xxl: 140 }}
                            icon={<AntDesignOutlined />}
                        />
                    </Col>
                    <Col flex="1 0 33%">
                        <Space direction="vertical">
                            <Text strong style={{fontSize:"150%"}}>{user.currentGroup.name}</Text>
                            <Text type="secondary">{(memberCount!==1) ? memberCount+' miembros' : memberCount+' miembro'}</Text>
                        </Space>
                    </Col>
                    <Col flex="1 0 34%">
											<Select 
												size="medium"
												defaultValue={user.currentGroup.name}
												//onChange={}
												style={{ width: 200 }}
											>
												{user.memberOf.map(g=><Option key={g.id}>{g.name}</Option>)}
											</Select>
                    </Col>
                </Row>
								<Row gutter={16} style={{ marginBlockStart:"5%" }}>
									<Col span={12}>
										<Card>
											<Statistic
												title="Active"
												value={11.28}
												precision={2}
												valueStyle={{ color: '#3f8600' }}
												prefix={<ArrowUpOutlined />}
												suffix="%"
											/>
										</Card>
									</Col>
									<Col span={12}>
										<Card>
											<Statistic
												title="Active"
												value={11.28}
												precision={2}
												valueStyle={{ color: '#3f8600' }}
												prefix={<ArrowUpOutlined />}
												suffix="%"
											/>
										</Card>
									</Col>
								</Row>
								<Row gutter={16} style={{ marginBlockStart:"5%" }}>
									<Col span={12}>
										<Card
											hoverable
											style={{ textAlign: "center" }}
										>
											<Space direction="vertical">
												<Avatar
														size={{ xs: 85, sm: 85, md: 85, lg: 120, xl: 140, xxl: 140 }}
														icon={<AntDesignOutlined />}
												/>
												<div style={{ textAlign: "left" }}>
                        <Title level={5}>Reporte de casos de prueba</Title>
                        <Text>Reporte del número de casos de pruebas exportados y de planes de prueba creados</Text>
												</div>
											</Space>
										</Card>
									</Col>
									<Col span={12}>
										<Card
											hoverable
											style={{ textAlign: "center" }}
										>
											<Space direction="vertical">
												<Avatar
														size={{ xs: 85, sm: 85, md: 85, lg: 120, xl: 140, xxl: 140 }}
														icon={<AntDesignOutlined />}
												/>
												<div style={{ textAlign: "left" }}>
                        <Title level={5}>Reporte de casos de prueba</Title>
                        <Text>Reporte del número de casos de pruebas exportados y de planes de prueba creados</Text>
												</div>
											</Space>
										</Card>
									</Col>
								</Row>
            </div>
            </>
        );
    }
}

export default withRouter(ReportsMainView);