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
import { ProjectsIso, TestplansIso, ReportsIso } from '../CustomIcons2.js';

const { Text } = Typography

class CommonUserOptions extends React.Component {

		render() {
			return(
			<>
			<Divider/>
			<Row gutter={16} style={{ marginBlockStart:"5%" }}>
				<Col span={8}>
					<Link to={{ pathname:"/projects/manage"}}>
						<Card
							hoverable
							style={{ textAlign: "center" }}
							className="common-user-card"
							title="Gestión de proyectos"
						>
								<Space direction="vertical">
									<ProjectsIso/>
								</Space>
						</Card>
					</Link>
				</Col>
				<Col span={8}>
					<Link to={{ pathname:"/testplans/manage"}}>
						<Card
							hoverable
							style={{ textAlign: "center" }}
							className="common-user-card"
							title="Gestión de planes de prueba"
						>
							<Space direction="vertical">
								<Space direction="vertical">
									<TestplansIso/>
								</Space>
							</Space>
						</Card>
					</Link>
				</Col>
				<Col span={8}>
					<Link to={{ pathname:"/reports"}}>
						<Card
							hoverable
							style={{ textAlign: "center" }}
							className="common-user-card"
							title="Reportes"
						>
							<Space direction="vertical">
								<Space direction="vertical">
								<ReportsIso/>
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