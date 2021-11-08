import {
    LeftCircleOutlined
} from '@ant-design/icons';
import {
    Alert, Breadcrumb, Button, Col, Divider, Row, Space, Tag, Tooltip, Typography
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import * as d from '../../AppConsts.json';
import TestcaseForm from '../modals/testcaseForm';
import TestcaseSteps from './testcaseSteps';

class Testcase extends React.Component {
    constructor(props){
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.isEditModalVisible = this.isEditModalVisible.bind(this)
        this.showMessages = this.showMessages.bind(this)
        this.handleSaveStepsClick = this.handleSaveStepsClick.bind(this)
    }

    state = {
        showEditModal: false,
				loading: true
    }
    
    componentDidMount() {
        const { testcase, setTestplan, fetchTestcase, action } = this.props
				
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

    showMessages() {
        const { messages } = this.props
        let alertList = []
        for (let index = 0; index < messages.length; index++) {
            let msg = messages[index]
            alertList.push(
                <Alert style={{ marginBlock: "1%" }} key={index} message={msg.text} type={msg.type} showIcon closable/>
            )
        }
        return alertList
    }

    handleSaveStepsClick() {
        const { saveSteps } = this.props
        saveSteps()
    }

    render() {
        const { testcase, upsertTestcase, addStep, editStep, deleteStep, action, modifiedSteps, variablesOperations, loading } = this.props
        const { showEditModal } = this.state
        const { Title,Text } = Typography
				if(loading) return (<></>)
        return(
            <>
            { (action === 'create') ?
                <Breadcrumb>
                    <Breadcrumb.Item>{testcase.testplanName}</Breadcrumb.Item>
                    <Breadcrumb.Item>Crear caso de prueba</Breadcrumb.Item>
                </Breadcrumb>
                : (
                <Breadcrumb>
                    <Breadcrumb.Item>{testcase.testplanName}</Breadcrumb.Item>
                    <Breadcrumb.Item>{testcase.testcaseName}</Breadcrumb.Item>
                </Breadcrumb>
                )
            }
            <div className="navigation">
                <Row>
                    <Col>
                        <Tooltip title="Atrás">
                            <LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.push("/testplans/id=" + testcase.testplanId)}}/>
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div className="container">
									<div className="testcase-messages">
											{this.showMessages()}
									</div>
                <Title level={3}>Caso de prueba</Title>
                <Row style={{display: "flex", alignItems: "top"}}>
                    <Col span={4}>
												<Space direction="vertical">
													<Text className="modal-title-label">Nombre</Text>
													<Title level={4}>{testcase.testcaseName}</Title>
													<Text className="modal-title-label">Descripción</Text>
													<Text>{testcase.description}</Text>
													<Text className="modal-title-label">Precondiciones</Text>
													<Text>{testcase.preconditions}</Text>
													<Text className="modal-title-label">Prioridad</Text>
													<Tag color={(d.priorities[testcase.priority]) ? d.priorities[testcase.priority]["color"] : ''}>
														{(d.priorities[testcase.priority]) ? d.priorities[testcase.priority]["label"] : ''}
													</Tag>
													<Button type="primary" onClick={this.handleEditClick} style={{marginTop: "25px"}}>Modificar</Button>													
												</Space>
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
										
											<Col span={1}>
												<Divider  type="vertical" style={{ height:"100%" }} dashed></Divider>
											</Col>
											
                    <Col span={18} style={{textAlign: "middle"}}>
                        <Row>
                            <Col span={18}>
                                <Title level={4}>Pasos</Title>
                            </Col>
                            <Col span={6} style={{textAlign: "end"}}>
                                <Button type="primary" disabled={!modifiedSteps} onClick={this.handleSaveStepsClick}>Guardar cambios</Button>
                            </Col>
                        </Row>
                        <Divider style={{ marginBlock: "10px" }}/>
                        <TestcaseSteps
																testcase={testcase}
                            steps={testcase.steps}
                            addStep={addStep}
                            editStep={editStep}
                            deleteStep={deleteStep}
                            variablesOperations={variablesOperations}
                        />
                    </Col>                    
                </Row>
            </div>
            </>
        );
    }
}

export default withRouter(Testcase);