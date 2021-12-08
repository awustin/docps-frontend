import { EditOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Card, Col, Divider, Row, Space, Spin, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as d from '../AppConsts.json';
import { getTestcaseById } from '../services/workspaceService';
import StepSection from '../steps/stepSection';
import TestcaseForm from './testcaseForm';

const { Title, Text } = Typography;
const { Meta } = Card;

export default function TestcaseView() {
    const history = useHistory();
    const { id } = useParams();
    const [testcase, setTestcase] = useState({});
    const [editProps, setEditProps] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => loadTestcase(), []);

    function loadTestcase() {
        setLoading(true)
        getTestcaseById(id).then((result) => {
            if (result.success) {
                setTestcase(result.testcase);
                setLoading(false);
            }
        });
    }

    function showTestcaseInformationCard() {
        if (testcase.id)
            return <>
                <Card
                    className="search-results__card"
                    actions={[
                        <Tooltip key={`edit-${id}`} title="Modificar" color="#108ee9">
                            <EditOutlined
                                style={{ fontSize: '150%', color: "#228cdbff" }}
                                onClick={() => setEditProps({
                                    visible: true,
                                    mode: 'update'
                                })}
                            />
                        </Tooltip>
                    ]}
                >
                    <Meta
                        title={<Title level={5} type="secondary">{testcase.groupName}</Title>}
                        description={
                            <Space direction={"vertical"}>
                                <Title level={5} type="secondary">{testcase.projectName} / {testcase.testplanName}</Title>
                                <Title level={4}>{testcase.name}</Title>
                                <Tooltip title={d.tooltip.testcase['Passed']} color="#108ee9">
                                    <Tag className={`status-tag ${d.statuses['Passed'].class}`}>{d.statuses['Passed'].label}</Tag>
                                </Tooltip>
                                <p>{testcase.description}</p>
                                <Tag color={(d.priorities[testcase.priority]) ? d.priorities[testcase.priority]["color"] : ''}>
                                    {(d.priorities[testcase.priority]) ? d.priorities[testcase.priority]["label"] : ''}
                                </Tag>
                            </Space>
                        }
                    />
                </Card>
                <Card className="search-results__card">
                    <Meta
                        title={"Precondiciones"}
                        description={
                            <Text>{testcase.preconditions}</Text>
                        }
                    />
                </Card>
            </>
    }

    function showExecutionsCard() {
        //Component
        return <>
            <Card
                className="search-results__card"
                actions={[
                    <Tooltip key={`edit-${id}`} title="Modificar" color="#108ee9">
                        <EditOutlined
                            style={{ fontSize: '150%', color: "#228cdbff" }}

                        />
                    </Tooltip>
                ]}
            >
                <Meta
                    title="Ejecuciones"
                    description={
                        <Space direction={"vertical"}>
                        </Space>
                    }
                />
            </Card>
        </>
    }

    function showStepsSection() {
        //Component
        return <>
            <StepSection
                id={id}
            />
        </>
    }

    return (<>
        <Breadcrumb>
            <Breadcrumb.Item>{testcase.groupName}</Breadcrumb.Item>
            <Breadcrumb.Item>{testcase.projectName}</Breadcrumb.Item>
            <Breadcrumb.Item>{testcase.testplanName}</Breadcrumb.Item>
            <Breadcrumb.Item>{testcase.name}</Breadcrumb.Item>
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
            <Title className="testcase-title" level={3}>Caso de prueba</Title>
            <Divider />
            <Spin spinning={loading} size="large">
                <Row>
                    <Col span={7}>
                        {showTestcaseInformationCard()}
                        {showExecutionsCard()}
                    </Col>

                    <Col span={0.5}>
                        <Divider type="vertical" style={{ height: "100%" }} dashed></Divider>
                    </Col>

                    <Col span={16}>
                        {showStepsSection()}
                    </Col>
                </Row>
            </Spin>
        </div>
        <TestcaseForm
            mode={editProps.mode}
            open={editProps.visible}
            close={() => setEditProps({ visible: false })}
            reloadSearch={loadTestcase}
            testcase={testcase}
        />

    </>)
}