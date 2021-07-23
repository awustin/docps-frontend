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
		Statistic,
		Skeleton
} from 'antd';
import {
    PlusCircleOutlined,
    EditOutlined,
    SearchOutlined,
    UsergroupAddOutlined,
		AntDesignOutlined,
		ExperimentOutlined,
		FileExcelOutlined		
} from '@ant-design/icons';

class ReportsMainView extends React.Component {
		constructor(props) {
			super(props)
			this.handleSelectGroup = this.handleSelectGroup.bind(this)
		}
		state = {
			memberCount: undefined,
			avatar: undefined,
			testplanCount: undefined,
			casesCount: undefined,
			loading: true
		}
		
		componentDidMount() {
			const { user } = this.props
			//Query para traer info del currentGroup (memberCount, avatar, planes creados y casos generados)
			setTimeout(() =>
			this.setState({
					memberCount: 10,
					avatar: undefined,
					testplanCount: 15,
					casesCount: 101,
					loading: false
			}),
			1000)
		}
		
		handleSelectGroup(value) {
			const { funcs } = this.props
			funcs.changeGroup(parseInt(value))
		}
		
    render() {
        const { user } = this.props
				const { memberCount, avatar, testplanCount, casesCount, loading } = this.state
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
											<Skeleton loading={loading} avatar={{active:true, shape:"circle", size:"100"}}>
                        <Avatar
                            size={{ xs: 85, sm: 85, md: 85, lg: 120, xl: 140, xxl: 140 }}
                            icon={<AntDesignOutlined />}
                        />
											</Skeleton>
                    </Col>
                    <Col flex="1 0 33%">
											<Skeleton loading={loading} active paragraph={{ rows: 2 }}>
												<Space direction="vertical">
														<Text strong style={{fontSize:"150%"}}>{user.currentGroup.name}</Text>
														<Text type="secondary">{(memberCount!==1) ? memberCount+' miembros' : memberCount+' miembro'}</Text>
												</Space>
											</Skeleton>
                    </Col>
                    <Col flex="1 0 34%">
											<Card
												style={{ textAlign: "left", height: "100%" }}
											>
													<Text type="secondary">Cambiar equipo</Text>
													<Divider/>
													<Select 
														size="medium"
														defaultValue={user.currentGroup.name}
														onChange={this.handleSelectGroup}
														style={{ width: 200 }}
													>
														{user.memberOf.map(g=><Option key={g.id}>{g.name}</Option>)}
													</Select>										
											</Card>
                    </Col>
                </Row>
								<Row gutter={16} style={{ marginBlockStart:"5%" }}>
									<Col span={12}>
										<Card>
											<Statistic
												title="Planes de pruebas"
												value={testplanCount}
												precision={0}
												valueStyle={{ color: '#4266f5', fontSize: "250%"}}
												prefix={<ExperimentOutlined />}
												loading={loading}
											/>
										</Card>
									</Col>
									<Col span={12}>
										<Card>
											<Statistic
												title="Casos de pruebas generados"
												value={casesCount}
												precision={0}
												valueStyle={{ color: '#e0b422', fontSize: "250%" }}
												prefix={<FileExcelOutlined />}
												loading={loading}
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
                        <Text>Reporte de la cantidad de casos de prueba y planes creados.</Text>
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
                        <Title level={5}>Reporte de ejecuciones</Title>
                        <Text>Reporte del número ejecuciones de los casos de prueba realizadas</Text>
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