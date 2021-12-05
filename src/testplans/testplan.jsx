import { EditOutlined, LeftCircleOutlined, PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Alert, Breadcrumb, Button, Card, Col, Divider, Row, Space, Spin, Tag, Tooltip, Typography, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as d from '../AppConsts.json';
import { getTestplanById } from '../services/testplansService';
import TestplanForm from './testplanForm';

const { Title, Text } = Typography;
const { Meta } = Card;


export default function Testplan() {
    const history = useHistory();
    const { id } = useParams();
    const [testplan, setTestplan] = useState({});
    const [editProps, setEditProps] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSearch();
    }, []);

    function loadSearch() {
        setLoading(true);
        getTestplanById(id).then((result) => {
            if (result.success) {
                setTestplan(result.testplan);
                setLoading(false);
            }
        })
    }

    function showTestplanInformationCard() {
        if (testplan.testplanId)
            return <>
                <Card
                    className="search-results__card"
                    actions={[
                        <Tooltip key={`edit-${id}`} title="Modificar" color="#108ee9">
                            <EditOutlined
                                style={{ fontSize: '150%', color: "#228cdbff" }}
                                onClick={() => setEditProps({
                                    visible: true,
                                    mode: 'update',
                                    testplan: testplan,
                                    reloadSearch: loadSearch
                                })}

                            />
                        </Tooltip>
                    ]}
                >
                    <Meta
                        title={testplan.groupName}
                        description={
                            <Space direction={"vertical"}>
                                <Title level={5}>{testplan.projectName}</Title>
                                <Title level={4}>{testplan.testplanName}</Title>
                                <Tooltip key={`status-${testplan.key}`} title={d.tooltip.testplan[testplan.status]} color="#108ee9">
                                    <Tag className={`status-tag ${d.statuses[testplan.status].class}`}>{d.statuses[testplan.status].label}</Tag>
                                </Tooltip>
                                <p>{testplan.description}</p>
                                <div>
                                    {testplan.tags.map(tag => <Tag className={'tags'} key={testplan.key + tag}>{tag}</Tag>)}
                                </div>
                            </Space>
                        }
                    />
                </Card>
            </>

    }

    function showTestcasesList() {
        if ((testplan.cases || []).length > 0)
            return <List
                size="small"
                pagination={{
                    pageSize: 5
                }}
                dataSource={testplan.cases}
                bordered={false}
                renderItem={item => (
                    <List.Item
                        key={item.key}
                        span={4}
                        actions={[
                            <Tooltip key={`edit-${item.key}`} title="Modificar caso de prueba" color="#108ee9">
                                <EditOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => history.push(`/workspace/id=${item.id}&p=${testplan.testplanId}&n=${testplan.testplanName}`)} />
                            </Tooltip>,
                            <Tooltip key={`delete-${item.key}`} title="Eliminar caso de prueba" color="#108ee9">
                                <DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff" }} onClick={() => { this.setState({ visibleDelete: true, deleteTestcaseId: item.id }) }} />
                            </Tooltip>,
                        ]}
                        className={'list-item testcase'}
                        style={{ background: "#fff" }}
                    >
                        <List.Item.Meta
                            description=<div className={'list-item description'}>
                            {'Últ. modificación: ' + item.modifiedOn}
                        </div>
                            />
                        {item.caseName}
                    </List.Item>
                )}
            />
        if (testplan.testplanId && (testplan.cases || []).length === 0)
            return <Alert
                message="No hay casos de pruebas"
                description="Este plan de pruebas no contiene casos de pruebas. Cree un caso de prueba nuevo."
                type="info"
                showIcon
                closable={false}
            />


    }

    return (<>
        <Breadcrumb>
            <Breadcrumb.Item>{testplan.groupName}</Breadcrumb.Item>
            <Breadcrumb.Item>{testplan.projectName}</Breadcrumb.Item>
            <Breadcrumb.Item>{testplan.testplanName}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="navigation">
            <Row>
                <Col flex="1 0 25%">
                    <Tooltip title="Atrás">
                        <LeftCircleOutlined style={{ fontSize: "200%" }} onClick={() => history.goBack()}
                        />
                    </Tooltip>
                </Col>
            </Row>
        </div>
        <div className="container">
            <Title className="testplan-title" level={3}>Plan de pruebas</Title>
            <Divider />
            <Spin spinning={loading} size="large">
                <Row>
                    <Col span={7}>
                        {showTestplanInformationCard()}
                    </Col>

                    <Col span={1}>
                        <Divider type="vertical" style={{ height: "100%" }} dashed></Divider>
                    </Col>

                    <Col span={16}>
                        <Col style={{ textAlign: "end", marginBlockEnd: "1%" }}>
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined style={{ fontSize: "110%" }} />}
                                onClick={() => history.push(`/workspace/create?p=${testplan.testplanId}&n=${testplan.testplanName}`)}
                            >
                                Crear caso de prueba
                            </Button>
                        </Col>
                        <Divider key={testplan.testplanName + '-divider'} orientation="left" style={{ alignItems: 'center' }}>
                            <Text type="secondary">Casos de pruebas</Text>
                        </Divider>
                        {showTestcasesList()}
                    </Col>
                </Row>
            </Spin>
            <TestplanForm
                mode={editProps.mode}
                open={editProps.visible}
                close={() => setEditProps({ visible: false })}
                reloadSearch={editProps.reloadSearch}
                id={id}
                testplan={editProps.testplan}
            />
        </div>

    </>)
}