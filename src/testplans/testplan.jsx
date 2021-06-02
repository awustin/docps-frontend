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
} from 'antd';
import { withRouter } from "react-router";
import { 
    EditOutlined,
    DeleteOutlined,
    ThunderboltOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TestplanEdit from './modals/testplanEdit';

class Testplan extends React.Component {
    constructor(props){
        super(props)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.statusTag = this.statusTag.bind(this)
        this.isEditModalVisible = this.isEditModalVisible.bind(this)
        this.fetchTestcases = this.fetchTestcases.bind(this)
    }
    state = {
        showEditModal: false,
        testcases: []
    }

    componentDidMount() {
        const { fetchTestplan } = this.props
        if(Object.keys(this.props).includes("match") && fetchTestplan !== undefined )
        {
            let projectId = this.props.match.params.projectId
            let testplanId = this.props.match.params.testplanId
            fetchTestplan(projectId, testplanId)
        }
        this.fetchTestcases()
    }

    fetchTestcases() {
        //Query
        let cases = []
        let statuses = ['Not executed','In progress','Passed','Failed']
        for (let index = 0; index < 5; index++) {
            let item = {
                key: 'case'+index*2,
                caseId: index,
                caseName: 'CasoDePrueba-'+index,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                modifiedOn: '1/02/2021'
            }
            cases.push(item)            
        }
        this.setState({ testcases: cases })
    }

    handleEditClick() {
        this.setState({ showEditModal: true })
    }

    statusTag(status) {
        switch(status)
        {
            case 'Not executed':
                return (
                    <Tooltip title="No tiene ejecuciones en progreso" color="#108ee9">
                        <Tag color="#999997">No ejecutado</Tag>
                    </Tooltip>
                )
            case 'In progress':
                return (
                    <Tooltip title="Tiene ejecuciones en progreso" color="#108ee9">
                        <Tag color="#ebcf52">En progreso</Tag>
                    </Tooltip>
                )
            case 'Passed':
                return (
                    <Tooltip title="Todas las ejecuciones pasaron" color="#108ee9">
                        <Tag color="#09de8c">Pasó</Tag>
                    </Tooltip>
                )
            case 'Failed':
                return (
                    <Tooltip title="Todas las ejecuciones fallaron" color="#108ee9">
                        <Tag color="#f50">Falló</Tag>
                    </Tooltip>
                )
        }
    }
    
    isEditModalVisible(value) {
        this.setState({ showEditModal: value })
    }

    render() {
        const { testplan, updateTestplan } = this.props
 
        const { testcases } = this.state
        const { showEditModal } = this.state
        const { Title,Text } = Typography
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Planes de prueba</Breadcrumb.Item>
                <Breadcrumb.Item>{testplan.testplanName}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="testplan-description-container" style={{margin: "50px"}}>
                <Title level={3}>Plan de prueba</Title>
                <Row style={{display: "flex", alignItems: "top"}}>
                    <Col flex="1 0 75%">
                        <Descriptions column={1} size="small" labelStyle={{width: "100px"}} bordered>
                            <Descriptions.Item label="Nombre"><Text strong>{testplan.testplanName}</Text></Descriptions.Item>
                            <Descriptions.Item label="Descripción">{testplan.description} {testplan.description} {testplan.description}</Descriptions.Item>
                            <Descriptions.Item label="Estado">{this.statusTag(testplan.status)}</Descriptions.Item>
                            <Descriptions.Item label="Etiquetas">{testplan.tags.map(tag => <Tag key={testplan.key + tag}>{tag}</Tag>)}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col flex="1 0 25%" style={{textAlign: "end"}}>
                        <Button type="primary" onClick={this.handleEditClick}>Modificar</Button>
                        <TestplanEdit 
                            id={testplan.testplanId} 
                            testplanAttributes={[testplan.testplanName,testplan.description,testplan.tags]} 
                            updateTestplan={updateTestplan}
                            visible={showEditModal} 
                            isEditModalVisible={this.isEditModalVisible} 
                        />
                    </Col>                    
                </Row>
                <Divider dashed></Divider>
            </div>
            <div className="testplan-testcases-container"  style={{margin: "50px"}}>
                <Row style={{display: "flex", alignItems: "center", paddingBottom: "1%"}}>
                    <Col flex="1 0 75%">
                        <Title level={4}>Casos de prueba</Title>
                    </Col>
                </Row>
                <List
                    size="small"
                    pagination={{
                        pageSize: 5
                        }}
                    dataSource={testcases}
                    bordered={false}
                    renderItem={item => (
                        <List.Item
                            key={item.key}
                            span={4}
                            actions={[
                                <Link to={{ pathname: "/workspace/id=" + item.id }} style={{color:"#000"}}><EditOutlined style={{ fontSize: '150%'}} /></Link>,
                                <ThunderboltOutlined style={{ fontSize: '150%', color: "#000"}} />,
                                <DeleteOutlined style={{ fontSize: '150%', color: "#000"}} />
                            ]}
                            style={{background: "#fff"}}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.caseName}</a>}
                                description={'Última modificación: ' + item.modifiedOn}
                                />
                        </List.Item>
                    )}
                />
            </div>
            </>
        );
    }
}

export default React.memo(withRouter(Testplan));