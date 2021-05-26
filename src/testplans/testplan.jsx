import React from 'react';
import {
    Typography,
    Divider,
    Button,
    Row,
    Col,
} from 'antd';
import { withRouter } from "react-router";

class Testplan extends React.Component {
    constructor(props){
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.isEditModalVisible = this.isEditModalVisible.bind(this)
        this.updateProjectName = this.updateProjectName.bind(this)
    }
    state = {
        testPlan: 'NOMBRE-PLAN',
        showEditModal: false
    }

    handleEditClick() {
        this.setState({ showEditModal: true })
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
        console.log(testplan)
        const { showEditModal } = this.state
        const { Title } = Typography
        return(
            <>
            <div className="project-container" style={{margin: "50px"}}>
                <Row style={{display: "flex", alignItems: "center"}}>
                    <Col flex="1 0 75%">
                        <Title level={3}>{testplan.testplanName}</Title>
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