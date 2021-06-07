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
    List,
    Avatar,
    Tooltip,
    Card,
} from 'antd';
import { withRouter } from "react-router";
import { 
    EditOutlined,
    DeleteOutlined,
    ThunderboltOutlined,
    PlusCircleFilled,
} from '@ant-design/icons';
import TestcaseSetps from './testcaseSteps';
import TestcaseForm from '../modals/testcaseForm';

class Testcase extends React.Component {
    constructor(props){
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.isEditModalVisible = this.isEditModalVisible.bind(this)
    }

    state = {
        showEditModal: false,
    }
    
    componentDidMount() {      
        const { setTestplan } = this.props
        if(Object.keys(this.props).includes("match") && setTestplan !== undefined)
        {
            let id = this.props.match.params.testplanId
            let name = this.props.match.params.testplanName
            setTestplan(id, name)
        }
    }

    handleEditClick() {
        this.setState({ showEditModal: true })
    }
    
    isEditModalVisible(value) {
        this.setState({ showEditModal: value })
    }

    render() {
        const { testcase, addStep } = this.props
        const { showEditModal } = this.state
        const { Title,Text } = Typography
        const { Meta } = Card
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Planes de prueba</Breadcrumb.Item>
                <Breadcrumb.Item>{testcase.testplanName}</Breadcrumb.Item>
                <Breadcrumb.Item>Crear caso de prueba</Breadcrumb.Item>
            </Breadcrumb>
            <div className="testcase-container" style={{margin: "50px"}}>
                <Row style={{display: "flex", alignItems: "top"}}>
                    <Col flex="1 0 25%">
                        <Card actions={[ 
                            <EditOutlined key="edit" onClick={this.handleEditClick}/> 
                        ]}>
                            <Title level={5}>Caso de prueba</Title>
                            <Descriptions column={1} size="small" labelStyle={{width: "120px"}}>
                                <Descriptions.Item label="Nombre"><Text strong>nombre</Text></Descriptions.Item>
                                <Descriptions.Item label="Descripción">Descripción</Descriptions.Item>
                                <Descriptions.Item label="Precondiciones">tag</Descriptions.Item>
                                <Descriptions.Item label="Prioridad">tags</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <TestcaseForm 
                            visible={showEditModal} 
                            isEditModalVisible={this.isEditModalVisible} 
                        />
                    </Col>
                    <Col flex="1 0 75%" style={{textAlign: "middle"}}>
                        <Title level={5} style={{marginLeft: "20px"}}>Pasos</Title>
                        <TestcaseSetps steps={testcase.steps} addStep={addStep}/>
                    </Col>                    
                </Row>
            </div>
            </>
        );
    }
}

export default withRouter(Testcase);