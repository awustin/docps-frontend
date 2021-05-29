import React from 'react';
import {
    Typography,
    Divider,
    Button,
    Row,
    Col,
    Descriptions,
    Tag,
    Breadcrumb,
} from 'antd';
import { withRouter } from "react-router";

class Testplan extends React.Component {
    constructor(props){
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.statusTag = this.statusTag.bind(this)
        this.isEditModalVisible = this.isEditModalVisible.bind(this)
        this.updateProjectName = this.updateProjectName.bind(this)
    }
    state = {
        showEditModal: false
    }

    componentDidMount() {
        const { fetchTestplan } = this.props
        if(Object.keys(this.props).includes("match") && fetchTestplan !== undefined )
        {
            let projectId = this.props.match.params.projectId
            let testplanId = this.props.match.params.testplanId
            fetchTestplan(projectId, testplanId)
        }
    }

    handleEditClick() {
        this.setState({ showEditModal: true })
    }

    statusTag() {
        const { testplan } = this.props
        switch(testplan.status)
        {
            case 'Not executed':
                return <Tag color="#999997">No ejecutado</Tag>
            case 'In progress':
                return <Tag color="#ebcf52">En progreso</Tag>
            case 'Passed':
                return <Tag color="#09de8c">Pasó</Tag>
            case 'Failed':
                return <Tag color="#f50">Falló</Tag>
        }
    }
    
    isEditModalVisible(value) {
        this.setState({ showEditModal: value })
    }

    updateProjectName(value) {
        //Query
        this.setState({ projectName: value })
    }

    render() {
        const { testplan } = this.props
        const { showEditModal } = this.state
        const { Text } = Typography
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Planes de prueba</Breadcrumb.Item>
                <Breadcrumb.Item>{testplan.testplanName}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="project-container" style={{margin: "50px"}}>
                <Row style={{display: "flex", alignItems: "top"}}>
                    <Col flex="1 0 75%">
                        <Descriptions column={1} size="small" labelStyle={{width: "100px"}}bordered>
                            <Descriptions.Item label="Nombre"><Text strong>{testplan.testplanName}</Text></Descriptions.Item>
                            <Descriptions.Item label="Descripción">{testplan.description} {testplan.description} {testplan.description}</Descriptions.Item>
                            <Descriptions.Item label="Estado">{this.statusTag()}</Descriptions.Item>
                            <Descriptions.Item label="Etiquetas"><Tag>{testplan.tags}</Tag></Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col flex="1 0 25%" style={{textAlign: "end"}}>
                        <Button type="primary" onClick={this.handleEditClick}>Modificar</Button>
                        {/*
                        <ProjectEdit 
                            id={id} 
                            projectName={projectName} 
                            updateProjectName={this.updateProjectName}
                            visible={showEditModal} 
                            isEditModalVisible={this.isEditModalVisible} 
                        />
                        */}
                    </Col>                    
                </Row>
                <Divider dashed></Divider>
                {/*<ProjectTestplanList project={{projectId: id, projectName: projectName}}/>*/}
            </div>
            </>
        );
    }
}

export default withRouter(Testplan);