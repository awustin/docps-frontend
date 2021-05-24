import React from 'react';
import {
    Typography,
    Divider,
    Button,
    Row,
    Col,
} from 'antd';
import { withRouter } from "react-router";
import ProjectEdit from './modals/projectEdit';
import ProjectTestplanList from './projectTestplanList';

class Project extends React.Component {
    constructor(props){
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.isEditModalVisible = this.isEditModalVisible.bind(this)
        this.updateProjectName = this.updateProjectName.bind(this)
    }
    state = {
        projectName: 'NOMBRE DEL PROYECTO',
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
        const { projectName, showEditModal } = this.state
        const { id } = this.props.match.params
        const { Title } = Typography
        return(
            <>
            <div className="project-container" style={{margin: "50px"}}>
                <Row style={{display: "flex", alignItems: "center"}}>
                    <Col flex="1 0 75%">
                        <Title level={3}>{projectName} (id = {id})</Title>
                    </Col>
                    <Col flex="1 0 25%" style={{textAlign: "end"}}>
                        <Button type="primary" onClick={this.handleEditClick}>Modificar</Button>
                        <ProjectEdit 
                            id={id} 
                            projectName={projectName} 
                            updateProjectName={this.updateProjectName}
                            visible={showEditModal} 
                            isEditModalVisible={this.isEditModalVisible} 
                        />
                    </Col>                    
                </Row>
                <Divider dashed></Divider>
                <ProjectTestplanList projectId={id}/>
            </div>
            </>
        );
    }
}

export default withRouter(Project);