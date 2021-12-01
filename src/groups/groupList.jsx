import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Divider, Form, Input, List, Row, Select, Space, Spin, Tag, Tooltip, Typography } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import '../CustomStyles.css';
import { getGroupAndMembersById, searchGroups } from '../services/groupsService';
import GroupForm from './groupForm';
import GroupActivate from './modals/groupActivate';
import GroupDelete from './modals/groupDelete';

const { Text } = Typography;

class GroupList extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showResults = this.showResults.bind(this)
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
                this.statusTag(item.status, item.key),
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
                this.statusTag(item.status, item.key),
                <Tooltip key={`edit-${item.key}`} title="Modificar grupo" color="#108ee9">
                    <EditOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => { this.updateGroup(item.id) }} />
                </Tooltip>
            ];
        }
        return [this.statusTag(item.status, item.key)];
    }

    showResults() {
        const { results } = this.state
        if (results !== undefined)
            return (
                <>
                    <div className="group-search-results">
                        <List
                            size="small"
                            pagination={{
                                pageSize: 15
                            }}
                            dataSource={results}
                            bordered={false}
                            renderItem={item => (
                                <List.Item
                                    key={item.key}
                                    span={4}
                                    actions={this.actionsPerRole(item)}
                                    className={'list-item'}
                                    style={{ background: "#fff" }}
                                >
                                    <List.Item.Meta
                                        avatar={(item.avatar) ? (
                                            <Avatar src={item.avatar} />
                                        ) : (
                                            <Avatar className={item.defaultAvatar} />
                                        )
                                        }
                                    />
                                    <Space direction="vertical" size={0.5} style={{ width: '100%' }}>
                                        <Row>
                                            <div className={'list-item description'}>
                                                <Text className={'date hideable'} key={item.key + 'created'} type="secondary"><i> Fecha de creación: {item.createdOn}</i></Text>
                                            </div>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col>
                                                <Text className={'list-item-main-content'}>{item.name}</Text>
                                            </Col>
                                        </Row>
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </div>
                </>
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
                            {this.showResults()}
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