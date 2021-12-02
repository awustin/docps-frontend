import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Form, Input, Row, Select, Space, Spin, Tag, Tooltip } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import '../CustomStyles.css';
import { getGroupAndMembersById, searchGroups } from '../services/groupsService';
import GroupForm from './groupForm';
import GroupActivate from './modals/groupActivate';
import GroupDelete from './modals/groupDelete';

const { Meta } = Card;

class GroupList extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showCardResults = this.showCardResults.bind(this)
        this.statusTag = this.statusTag.bind(this)
        this.reloadSearch = this.reloadSearch.bind(this)
        this.updateGroup = this.updateGroup.bind(this)
        this.actionsPerRole = this.actionsPerRole.bind(this)
    }
    state = {
        lastValues: undefined,
        statusOptions: [
            {
                value: 'inactive',
                name: 'Inactivo'
            },
            {
                value: 'active',
                name: 'Activo'
            },
            {
                value: 'any',
                name: 'Todos'
            }
        ],
        results: undefined,
        error: undefined,
        visibleEdit: false,
        visibleDelete: false,
        editGroupId: undefined,
        openForm: false,
        mode: 'add',
        group: undefined,
        loading: false
    }

    handleSubmit(values) {
        const { user } = this.props;
        values['userId'] = user.id;
        values['role'] = user.role;
        this.setState({ loading: true })
        searchGroups(values).then((result) => {
            let { success, groups } = result
            if (success) {
                this.setState({ results: groups, lastValues: values })
            }
            this.setState({ loading: false })
        })
    }

    reloadSearch() {
        const { lastValues } = this.state
        if (lastValues !== undefined) {
            this.setState({ loading: true })
            searchGroups(lastValues).then((result) => {
                let { success, groups } = result
                if (success) {
                    this.setState({ results: groups })
                }
                this.setState({ loading: false })
            })
        }
    }

    updateGroup(id) {
        getGroupAndMembersById(id).then((result) => {
            const { success, group } = result;
            if (success)
                this.setState({
                    openForm: true,
                    mode: 'update',
                    group: group
                })
        })
    }

    statusTag(status, itemKey) {
        switch (status) {
            case 'active':
                return <Tag key={itemKey + 'green'} color="green">Activo</Tag>
            case 'inactive':
                return <Tag key={itemKey + 'red'} color="volcano">Inactivo</Tag>
            default:
                break
        }
    }

    actionsPerRole(item) {
        const { user } = this.props
        if (user.role === 'admin')
            return [
                <GroupActivate
                    key={item.key}
                    status={item.status}
                    id={item.id}
                    defaultChecked={item.status === 'active'}
                    reloadSearch={this.reloadSearch}
                />,
                <Tooltip key={`edit-${item.key}`} title="Modificar grupo" color="#108ee9">
                    <EditOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => { this.updateGroup(item.id) }} />
                </Tooltip>,
                <Tooltip key={`delete-${item.key}`} title="Eliminar grupo" color="#108ee9">
                    <DeleteOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => { this.setState({ visibleDelete: true, editGroupId: item.id }) }} />
                </Tooltip>
            ];
        if (item.status !== 'inactive') {
            return [
                <Tooltip key={`edit-${item.key}`} title="Modificar grupo" color="#108ee9">
                    <EditOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => { this.updateGroup(item.id) }} />
                </Tooltip>
            ];
        }
    }

    showCardResults() {
        const { results } = this.state
        if ((results || []).length > 0)
            return results.map(item =>
                <Card
                    className="search-results__card"
                    key={item.key}
                    cover={
                        <div className="cover" align="center">
                            {(item.avatar) ? (
                                <Avatar src={item.avatar} />
                            ) : (
                                <Avatar className={`cover__avatar ${item.defaultAvatar}`} />
                            )
                            }
                        </div>
                    }
                    actions={this.actionsPerRole(item)}
                >
                    <Meta
                        title={item.name}
                        description={
                            <Space direction="vertical">
                                {this.statusTag(item.status, item.key)}
                            </Space>
                        }
                    />
                </Card>
            )

    }

    render() {
        const { statusOptions, visibleDelete, editGroupId, mode, openForm, group, loading } = this.state
        const { user } = this.props
        const { Option } = Select
        const layout = {
            labelCol: { span: 18 },
            wrapperCol: { span: 20 },
        }
        const tailLayout = {
            wrapperCol: { span: 12 },
        }
        return (
            <>
                <Spin spinning={loading} size="large">
                    <Row>
                        <Col span={7}>
                            <Form {...layout}
                                name="groupSearch"
                                layout="vertical"
                                style={{ marginBlockStart: "1%" }}
                                onFinish={this.handleSubmit}
                            >
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            label="Nombre"
                                            name="name"
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Estado"
                                            name="status"
                                            initialValue={statusOptions[2].value}
                                        >
                                            <Select>
                                                {statusOptions.map(item => (<Option key={item.value} value={item.value}>{item.name}</Option>))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row span={16}>
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit">Buscar</Button>
                                    </Form.Item>
                                </Row>
                            </Form>
                        </Col>
                        <Col span={1}>
                            <Divider type="vertical" style={{ height: "100%" }} dashed />
                        </Col>
                        <Col span={16}>
                            <Col style={{ textAlign: "end", marginBlockEnd: "1%" }}>
                                {(user.role === 'admin') ?
                                    <Button
                                        icon={<PlusCircleOutlined />}
                                        type="primary"
                                        onClick={() => this.setState({ openForm: true, mode: 'add', group: undefined })}
                                    >
                                        Crear Grupo
                                    </Button>
                                    : <></>
                                }
                            </Col>
                            <div className="search-results">
                                {this.showCardResults()}
                            </div>
                        </Col>
                    </Row>
                </Spin>
                <GroupForm
                    mode={mode}
                    open={openForm}
                    group={group}
                    close={() => this.setState({ openForm: false })}
                    reloadSearch={this.reloadSearch}
                    role={user.role}
                />
                {(visibleDelete) ? (
                    <GroupDelete
                        groupId={editGroupId}
                        visibleDelete={visibleDelete}
                        closeDelete={() => this.setState({ visibleDelete: false })}
                        reloadSearch={this.reloadSearch}
                    />
                ) : (
                    <></>
                )}
            </>
        );
    }
}

export default withRouter(GroupList);