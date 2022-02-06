import { DeleteOutlined, EditOutlined, FormOutlined, LeftCircleOutlined, PlusCircleOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Alert, Breadcrumb, Button, Card, Col, Divider, List, Row, Space, Spin, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as d from '../AppConsts.json';
import ExecutionsPreview from '../executions/executionsPreview';
import TestcaseDelete from './modals/testcaseDelete';
import { getTestplanById } from '../services/testplansService';
import TestcaseForm from '../testcases/testcaseForm';
import TestplanForm from './testplanForm';
import './testplans.css';

const { Title, Text } = Typography;
const { Meta } = Card;


export default function Testplan(props) {
    const history = useHistory();
    const { id } = useParams();
    const [testplan, setTestplan] = useState({});
    const [editProps, setEditProps] = useState({});
    const [executionsProps, setExecutionsProps] = useState({});
    const [testcaseCreateProps, setTestcaseCreateProps] = useState({});
    const [testcaseDeleteProps, setTestcaseDeleteProps] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = props;

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
                                    testplan: testplan
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
                    pageSize: 20
                }}
                dataSource={testplan.cases}
                bordered={false}
                renderItem={item => (<>
                    <List.Item
                        className='testplan__row_result__item'
                        key={item.key}
                        span={4}
                        actions={[
                            <div key={`date-${item.key}`} className="row-result__date">{`Última modificación: ${item.modifiedOn}`}</div>,
                            <Tooltip key={`status-${item.key}`} title={d.tooltip.testcase[item.status]} color="#108ee9">
                                <Tag className={`status-tag ${d.statuses[item.status].class}`}>{d.statuses[item.status].label}</Tag>
                            </Tooltip>,
                            <Tooltip key={`edit-${item.key}`} title="Modificar caso de prueba" color="#108ee9">
                                <FormOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => history.push(`/workspace/testcase/id=${item.id}`)} />
                            </Tooltip>,
                            <Tooltip key={`delete-${item.key}`} title="Eliminar caso de prueba" color="#108ee9">
                                <DeleteOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => { setTestcaseDeleteProps({ visible: true, deleteTestcaseId: item.id }) }} />
                            </Tooltip>,
                            <Tooltip key={`see-executions-${item.key}`} title="Ver ejecuciones" color="#108ee9">
                                <ThunderboltOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => setExecutionsProps({ visible: true, testcaseId: item.id })} />
                            </Tooltip>,
                        ]}
                        style={{ background: "#fff" }}
                    >
                        <Space key={item.key + '-content'} direction="vertical" size={24} style={{ width: "100%" }}>
                            <Row gutter={16} className="row-result">
                                <div className={`row-result__status-mark ${d.statuses[item.status].class}`}>&nbsp;</div>
                                <Col>
                                    {item.caseName}
                                </Col>
                            </Row>
                        </Space>
                    </List.Item>
                    {(executionsProps.visible && executionsProps.testcaseId === item.id) ?
                        <Row key={`executions-${item.key}`} className='testplan__row-result__executions'>
                            <Col span={24}>
                                <ExecutionsPreview
                                    id={item.id}
                                    user={user}
                                    reloadTestcase={loadSearch}
                                />
                            </Col>
                        </Row>
                        : <></>
                    }
                    <TestcaseDelete
                        testcaseId={testcaseDeleteProps.deleteTestcaseId}
                        visibleDelete={testcaseDeleteProps.visible}
                        closeDelete={() => setTestcaseDeleteProps({ visible: false })}
                        reloadSearch={loadSearch}
                    />
                </>)}
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
                                onClick={() => setTestcaseCreateProps({
                                    visible: true,
                                    mode: 'add'
                                })}
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
                reloadSearch={loadSearch}
                id={id}
                testplan={editProps.testplan}
            />
            <TestcaseForm
                mode={testcaseCreateProps.mode}
                open={testcaseCreateProps.visible}
                close={() => setTestcaseCreateProps({ visible: false })}
                reloadSearch={loadSearch}
                testplanId={id}
            />
        </div>

    </>)
}