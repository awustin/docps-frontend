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
import * as d from '../../AppConsts.json';
import TestcaseSetps from './testcaseSteps';
import TestcaseForm from '../modals/testcaseForm';

class Testcase extends React.Component {
    constructor(props){
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.isEditModalVisible = this.isEditModalVisible.bind(this)
        this.priorityTag = this.priorityTag.bind(this)
    }

    state = {
        showEditModal: false,
    }
    
    componentDidMount() {    
        const { testcase,setTestplan,setTestcase,action } = this.props
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
                if(Object.keys(this.props).includes("match") && setTestcase !== undefined)
                {
                    let values = {
                        id: this.props.match.params.id,
                        testplanId: this.props.match.params.testplanId,
                        testplanName: this.props.match.params.testplanName
                    }
                    setTestcase(values)
                }
                break;
            default:
                break;
        }
    }

    handleEditClick() {
        console.log(this.props.testcase)
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

    render() {
        const { testcase, upsertTestcase, addStep } = this.props
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
                        />
                    </Col>
                    <Col flex="1 0 75%" style={{textAlign: "middle"}}>
                        <Title level={4} style={{marginLeft: "30px"}}>Pasos</Title>
                        <TestcaseSetps steps={testcase.steps} addStep={addStep}/>
                    </Col>                    
                </Row>
            </div>
            </>
        );
    }
}

export default withRouter(Testcase);