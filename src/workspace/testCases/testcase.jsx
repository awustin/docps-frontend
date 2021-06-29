import React from 'react';
import {
    Typography,
    Alert,
    Row,
    Col,
    Descriptions,
    Tag,
    Breadcrumb,
    Card,
    Divider,
    Button
} from 'antd';
import { withRouter } from "react-router";
import { 
    EditOutlined,
} from '@ant-design/icons';
import * as d from '../../AppConsts.json';
import TestcaseSteps from './testcaseSteps';
import TestcaseForm from '../modals/testcaseForm';

class Testcase extends React.Component {
    constructor(props){
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.isEditModalVisible = this.isEditModalVisible.bind(this)
        this.priorityTag = this.priorityTag.bind(this)
        this.showMessages = this.showMessages.bind(this)
        this.handleSaveStepsClick = this.handleSaveStepsClick.bind(this)
    }

    state = {
        showEditModal: false,
    }
    
    componentDidMount() {    
        const { testcase,setTestplan,fetchTestcase,action } = this.props
        switch(action)
        {
            case("create"):
                if(Object.keys(this.props).includes("match") && setTestplan !== undefined)
                {
                    let id = this.props.match.params.testplanId
                    let name = this.props.match.params.testplanName
                    setTestplan(id, name)
                }
                if(testcase.id === undefined)
                    this.setState({ showEditModal: true })
                break;
            case("edit"):
                if(Object.keys(this.props).includes("match") && fetchTestcase !== undefined)
                {
                    let values = {
                        id: this.props.match.params.id,
                        testplanId: this.props.match.params.testplanId,
                        testplanName: this.props.match.params.testplanName
                    }
                    fetchTestcase(values)
                }
                break;
            default:
                break;
        }
    }

    handleEditClick() {
        this.setState({ showEditModal: true })
    }
    
    isEditModalVisible(value) {
        this.setState({ showEditModal: value })
    }

    priorityTag() {
        const { testcase } = this.props
        let priority = testcase.priority
        let tagColor 
        switch(priority)
        {
            case "Low":
                tagColor = '#6cdef5'
                break
            case "Medium":
                tagColor = '#f5b642'
                break
            case "High":
                tagColor = '#f56942'
                break
            default:
                break
        }
        return <Tag color={tagColor}>{d.priorities[priority]}</Tag>
    }

    showMessages() {
        const { messages } = this.props
        return messages.map( (msg) => {
            return(<Alert key={msg} message={msg.text} type={msg.type} showIcon closable/>)
        })
    }

    handleSaveStepsClick() {
        const { saveSteps } = this.props
        saveSteps()
    }

    render() {
        const { testcase, upsertTestcase, addStep, editStep, action, modifiedSteps } = this.props
        const { showEditModal } = this.state
        const { Title,Text } = Typography
        const { Meta } = Card
        return(
            <>
            { (action === 'create') ?
                <Breadcrumb>
                    <Breadcrumb.Item>Planes de prueba</Breadcrumb.Item>
                    <Breadcrumb.Item>{testcase.testplanName}</Breadcrumb.Item>
                    <Breadcrumb.Item>Crear caso de prueba</Breadcrumb.Item>
                </Breadcrumb>
                : (
                <Breadcrumb>
                    <Breadcrumb.Item>Planes de prueba</Breadcrumb.Item>
                    <Breadcrumb.Item>{testcase.testplanName}</Breadcrumb.Item>
                    <Breadcrumb.Item>Modificar caso de prueba</Breadcrumb.Item>
                    <Breadcrumb.Item>{testcase.testcaseName}</Breadcrumb.Item>
                </Breadcrumb>
                )
            }
            <div className="testcase-container" style={{margin: "50px"}}>
                <Row style={{display: "flex", alignItems: "top"}}>
                    <Col flex="1 0 25%">
                        <Card
                            style={{ borderRadius: "0.8em" }}
                            actions={[ 
                            <EditOutlined key="edit" onClick={this.handleEditClick}/> 
                        ]}>
                            <Title level={5}>Caso de prueba</Title>
                            <Descriptions column={1} size="small" labelStyle={{width: "120px"}}>
                                <Descriptions.Item label="Nombre"><Text strong>{testcase.testcaseName}</Text></Descriptions.Item>
                                <Descriptions.Item label="Descripción">{testcase.description}</Descriptions.Item>
                                <Descriptions.Item label="Precondiciones">{testcase.preconditions}</Descriptions.Item>
                                <Descriptions.Item label="Prioridad">{this.priorityTag()}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <TestcaseForm 
                            visible={showEditModal}
                            isEditModalVisible={this.isEditModalVisible}
                            upsertTestcase={upsertTestcase}
                            values={{
                                id: testcase.id,
                                name: testcase.testcaseName,
                                description: testcase.description,
                                preconditions: testcase.preconditions,
                                priority: testcase.priority
                                }}
                        />
                    </Col>
                    <Col flex="1 0 75%" style={{textAlign: "middle"}}>
                        <Row>
                            <Col flex="1 0 75%">
                                <Title level={4} style={{marginLeft: "30px"}}>Pasos</Title>
                            </Col>
                            <Col flex="1 0 25%" style={{textAlign: "end"}}>
                                <Button type="primary" disabled={!modifiedSteps} onClick={this.handleSaveStepsClick}>Guardar cambios</Button>
                            </Col>
                        </Row>
                        <Divider style={{marginLeft: "30px"}}/>
                        <TestcaseSteps 
                            steps={testcase.steps}
                            addStep={addStep}
                            editStep={editStep}
                        />
                    </Col>                    
                </Row>
            </div>
            <div className="testcase-messages" style={{margin: "50px"}}>
                {this.showMessages()}
            </div>
            </>
        );
    }
}

export default withRouter(Testcase);