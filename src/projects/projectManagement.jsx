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
import ProjectSearchPane from './projectSearchPane';
import ProjectCreateForm from './projectCreateForm';

class ProjectManagement extends React.Component {
    render() {
        const { user } = this.props
        const { Title } = Typography
				const { TabPane } = Tabs
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                <Breadcrumb.Item>{user.id}</Breadcrumb.Item>
                <Breadcrumb.Item>Gestión de proyectos</Breadcrumb.Item>
            </Breadcrumb>						
						<div className="navigation">
							<Row>
									<Col flex="1 0 25%">
											<Tooltip title="Atrás">
													<LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.goBack()}}/>
											</Tooltip>
									</Col>
							</Row>
						</div>
						<div className="container">
							<Title level={2} style={{ marginBlockEnd:"0px" }}>Gestión de proyectos</Title>
							<Divider/>
							<Tabs defaultActiveKey="search">
								<TabPane key="search" tab={<><SearchOutlined />Buscar proyectos</>}>
									<ProjectSearchPane
										user={user}
									/>
								</TabPane>
								<TabPane key="create" tab={<><FolderAddOutlined />Crear proyecto</>}>
									<ProjectCreateForm
										user={user}
									/>
								</TabPane>
							</Tabs>
						</div>
            </>
        );
    }
}

export default withRouter(ProjectManagement);