import { withRouter } from "react-router";
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
		Card,
		Space
} from 'antd';
import {
		FolderOutlined,
		ExperimentOutlined,
		BarChartOutlined,
		EyeOutlined
} from '@ant-design/icons';

const { Text } = Typography

class CommonUserOptions extends React.Component {

		render() {
			return(
			<>
			<Divider/>
			<Row gutter={16} style={{ marginBlockStart:"5%" }}>
				<Col span={6}>
					<Link to={{ pathname:"/projects/manage"}}>
						<Card
							hoverable
							style={{ textAlign: "center" }}
							title="Gestión de proyectos"
						>
								<Space direction="vertical">
									<FolderOutlined															
										style={{ fontSize:"400%", color:"#228CDB"}}
									/>
								</Space>
						</Card>
					</Link>
				</Col>
				<Col span={6}>
					<Link to={{ pathname:"/testplans/manage"}}>
						<Card
							hoverable
							style={{ textAlign: "center" }}
							title="Gestión de planes de prueba"
						>
							<Space direction="vertical">
								<Space direction="vertical">
									<ExperimentOutlined															
										style={{ fontSize:"400%", color:"#228CDB"}}
									/>
								</Space>
							</Space>
						</Card>
					</Link>
				</Col>
				<Col span={6}>
					<Link to={{ pathname:"/reports"}}>
						<Card
							hoverable
							style={{ textAlign: "center" }}
							title="Reportes"
						>
							<Space direction="vertical">
								<Space direction="vertical">
									<BarChartOutlined															
										style={{ fontSize:"400%", color:"#228CDB"}}
									/>
								</Space>
							</Space>
						</Card>
					</Link>
				</Col>
				<Col span={6}>
					<Link to={{ pathname:"/user/myprofile"}}>
						<Card
							hoverable
							style={{ textAlign: "center" }}
							title="Mis datos"
						>
							<Space direction="vertical">
								<Space direction="vertical">
									<EyeOutlined															
										style={{ fontSize:"400%", color:"#228CDB"}}
									/>
								</Space>
							</Space>
						</Card>
					</Link>
				</Col>
			</Row> 
			</>
			)
		}
}

export default withRouter(CommonUserOptions);