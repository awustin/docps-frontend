import { DeleteOutlined, EditOutlined, FileExcelOutlined, FormOutlined, LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Alert, Breadcrumb, Button, Card, Col, Divider, List, Row, Space, Spin, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as d from '../AppConsts.json';
import { getProjectById } from '../services/projectsService';
import TestplanDelete from '../testplans/modals/testplanDelete';
import TestplanForm from '../testplans/testplanForm';

const { Title, Text } = Typography;
const { Meta } = Card;

export default function Project(props) {
    const history = useHistory();
    const { id } = useParams();
    const [project, setProject] = useState({});
    const [loading, setLoading] = useState(false);
    const [deleteProps, setDeleteProps] = useState({ visible: false });
    const [createProps, setCreateProps] = useState({ visible: false });
    const { user } = props;

    useEffect(() => {
        loadSearch();
    }, []);

    function loadSearch() {
        setLoading(true);
        getProjectById(id).then((result) => {
            if (result.success) {
                setProject(result.project);
                setLoading(false);
            }
        })
    }

    function showProjectInformationCard() {
        return <Card
            className="search-results__card"
            actions={[
                <Tooltip key={`edit-${id}`} title="Modificar" color="#108ee9">
                    <EditOutlined style={{ fontSize: '150%', color: "#228cdbff" }} />
                </Tooltip>
            ]}
        >
            <Meta
                title={
                    <>
                        <div className={`card-indicator ${project.defaultAvatar}`}>&nbsp;</div>
                        <div>{project.group}</div>
                    </>
                }
                description={
                    <Space direction={"vertical"}>
                        <Title level={4}>{project.name}</Title>
                        <p>Planes de pruebas: {(project.testplanList || []).length}</p>
                        <p>Fecha de creación: {project.createdOn}</p>
                    </Space>
                }
            />
        </Card>
    }

    function showTestplanList() {
        if ((project.testplanList || []).length > 0)
            return <>
                <List
                    size="small"
                    pagination={{
                        size: "small",
                        pageSize: 20
                    }}
                    dataSource={project.testplanList}
                    bordered={false}
                    renderItem={item => (
                        <List.Item
                            key={item.key}
                            span={4}
                            actions={[
                                <div key={`date-${item.key}`} className="row-result__date">{`Fecha de creación: ${item.createdOn}`}</div>,
                                <Tooltip key={`status-${item.key}`} title={d.tooltip.testplan[item.status]} color="#108ee9">
                                    <Tag className={`status-tag ${d.statuses[item.status].class}`}>{d.statuses[item.status].label}</Tag>
                                </Tooltip>,
                                <Tooltip key={`view-${item.key}`} title="Modificar plan de pruebas" color="#108ee9">
                                    <Link to={{ pathname: "/testplans/id=" + item.id }} style={{ color: "#228cdbff" }}>
                                        <FormOutlined style={{ fontSize: '150%', color: "#228cdbff" }} />
                                    </Link>
                                </Tooltip>,
                                <Tooltip key={`delete-${item.key}`} title="Eliminar plan de pruebas" color="#108ee9">
                                    <DeleteOutlined
                                        style={{ fontSize: '150%', color: "#228cdbff" }}
                                        onClick={() => setDeleteProps({
                                            visible: true,
                                            testplanId: item.id,
                                            reloadSearch: loadSearch
                                        })}
                                    />
                                </Tooltip>,
                                <Tooltip key={`export-${item.key}`} title="Exportar" color="#108ee9">
                                    <Link to={{ pathname: `/testplans/export=${item.id}` }} style={{ color: "#000" }}>
                                        <FileExcelOutlined style={{ fontSize: '150%', color: "#228cdbff" }} />
                                    </Link>
                                </Tooltip>
                            ]}
                            style={{ background: "#fff" }}
                        >
                            <Space direction="vertical" size={24} style={{ width: "100%" }}>
                                <Row gutter={16} className="row-result">
                                    <div className={`row-result__status-mark ${d.statuses[item.status].class}`}>&nbsp;</div>
                                    <Col>
                                        {item.title}
                                    </Col>
                                </Row>
                            </Space>
                        </List.Item>
                    )}
                />

            </>
        if (project.id && (project.testplanList || []).length === 0)
            return <Alert
                message="No hay planes de pruebas"
                description="Este proyecto no contiene planes de pruebas. Cree un plan de pruebas nuevo."
                type="info"
                showIcon
                closable={false}
            />

    }

    return (<>
        <Breadcrumb>
            <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
            <Breadcrumb.Item>Proyecto {project.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="navigation">
            <Row>
                <Col flex="1 0 25%">
                    <Tooltip title="Atrás">
                        <LeftCircleOutlined style={{ fontSize: "200%" }} onClick={() => { history.goBack() }} />
                    </Tooltip>
                </Col>
            </Row>
        </div>
        <div className="container">
            <Title level={2} style={{ marginBlockEnd: "0px" }}>Proyecto</Title>
            <Divider />
            <Spin spinning={loading}>
                <Row>
                    <Col span={7}>
                        {showProjectInformationCard()}
                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" style={{ height: "100%" }} dashed />
                    </Col>
                    <Col span={16}>
                        <Col style={{ textAlign: "end", marginBlockEnd: "1%" }}>
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined style={{ fontSize: "110%" }} />}
                                onClick={() =>
                                    setCreateProps({
                                        visible: true,
                                        mode: 'add-to-project',
                                        reloadSearch: loadSearch,
                                    })
                                }
                            >
                                Crear plan de pruebas
                            </Button>
                        </Col>
                        <Divider key={project.name + '-divider'} orientation="left" style={{ alignItems: 'center' }}>
                            <Text type="secondary">Planes de pruebas</Text>
                        </Divider>
                        {showTestplanList()}
                    </Col>
                </Row>
            </Spin>
            <TestplanForm
                mode={createProps.mode}
                open={createProps.visible}
                close={() => setCreateProps({ visible: false })}
                reloadSearch={createProps.reloadSearch}
                groupId={(project.id) ? project.id.split('.')[0] : undefined}
                projectId={(project.id) ? project.id.split('.')[1] : undefined}
            />
            <TestplanDelete
                testplanId={deleteProps.testplanId}
                visibleDelete={deleteProps.visible}
                closeDelete={() => setDeleteProps({ visible: false })}
                reloadSearch={deleteProps.reloadSearch}
            />

        </div>
    </>);
}