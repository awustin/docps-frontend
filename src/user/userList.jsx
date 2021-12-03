import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Card, Col, DatePicker, Divider, Form, Input, Pagination, Row, Select, Space, Spin, Tag, Tooltip } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import '../CustomStyles.css';
import { getUserInfoById, searchUsers } from '../services/usersService';
import { datePickerRangeConvert } from '../utils/format';
import UserActivate from './modals/userActivate';
import UserDelete from './modals/userDelete';
import UserForm from './userForm';

const { Meta } = Card;

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showCardResults = this.showCardResults.bind(this)
        this.statusTag = this.statusTag.bind(this)
        this.reloadSearch = this.reloadSearch.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.pageSize = 8;
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
        visibleDelete: false,
        user: undefined,
        openForm: false,
        mode: 'add',
        loading: false,
        currentPage: 1
    }

    handleSubmit(values) {
        values.createdOn = (values.createdOn) ? datePickerRangeConvert(values.createdOn) : undefined
        this.setState({ loading: true })
        searchUsers(values).then((result) => {
            let { success, users } = result
            if (success)
                this.setState({ results: users, lastValues: values, error: undefined })
            else
                this.setState({ results: undefined, error: "NO_DATA" })
            this.setState({ loading: false })
        })
    }

    reloadSearch() {
        const { lastValues } = this.state
        if (lastValues !== undefined) {
            this.setState({ loading: true })
            searchUsers(lastValues).then((result) => {
                let { success, users } = result
                if (success) {
                    this.setState({ results: users })
                }
                this.setState({ loading: false })
            })
        }
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

    updateUser(id) {
        getUserInfoById(id).then((result) => {
            let { success, user } = result
            if (success)
                this.setState({ mode: 'update', openForm: true, user: user })
        })
    }

    showCardResults() {
        const { results, error, currentPage } = this.state;
        if ((results || []).length > 0) {
            let paginatedResults = results.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize);
            return (
                <>
                    <div className="search-results">
                        {
                            paginatedResults.map(item =>
                                <Card
                                    className="search-results__card"
                                    key={item.key}
                                    cover={
                                        <div className="cover" align="center">
                                            {(item.avatar) ? (
                                                <Avatar src={item.avatar} />
                                            ) : (
                                                <Avatar className={`cover__avatar ${item.defAvatar}`} />
                                            )
                                            }
                                        </div>
                                    }
                                    actions={[
                                        <UserActivate
                                            key={item.key}
                                            status={item.status}
                                            email={item.email}
                                            id={item.id}
                                            defaultChecked={item.status === 'active'}
                                            reloadSearch={this.reloadSearch}
                                        />,
                                        <Tooltip key={`edit-${item.key}`} title="Modificar usuario" color="#108ee9">
                                            <EditOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => this.updateUser(item.id)} />
                                        </Tooltip>,
                                        <Tooltip key={`delete-${item.key}`} title="Eliminar usuario" color="#108ee9">
                                            <DeleteOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => { this.setState({ visibleDelete: true, editUserId: item.id }) }} />
                                        </Tooltip>
                                    ]}
                                >
                                    <Meta
                                        title={item.name}
                                        description={
                                            <Space direction="vertical">
                                                {this.statusTag(item.status, item.key)}
                                                <Tooltip key={`email-${item.key}`} title={item.email} color="#108ee9">
                                                    {item.email}
                                                </Tooltip>
                                            </Space>
                                        }
                                    />
                                </Card>)
                        }
                    </div>
                    <Pagination
                        className={"pagination-bottom"}
                        pageSize={this.pageSize}
                        total={results.length}
                        onChange={page => this.setState({ currentPage: page })}
                    />
                </>
            )
        }
        if (error === 'NO_DATA')
            return <Alert
                message="No hay resultados"
                description="No se encontraron resultados que coincidan con los criterios de búsqueda."
                type="info"
                showIcon
                closable={false}
            />
    }

    render() {
        const { statusOptions, visibleDelete, editUserId, openForm, mode, user, loading } = this.state
        const { Option } = Select
        const { RangePicker } = DatePicker
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
                            <div>
                                <Form {...layout}
                                    name="userSearch"
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
                                                label="Correo electrónico"
                                                name="email"
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Fecha de creación"
                                                name="createdOn"
                                            >
                                                <RangePicker />
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
                            </div>
                        </Col>
                        <Col span={1}>
                            <Divider type="vertical" style={{ height: "100%" }} dashed />
                        </Col>
                        <Col span={16} style={{ justifyContent: "center" }}>
                            <Col style={{ textAlign: "end", marginBlockEnd: "1%" }}>
                                <Button
                                    icon={<PlusCircleOutlined />}
                                    type="primary"
                                    onClick={() => this.setState({ openForm: true, mode: 'add', user: undefined })}
                                >
                                    Crear usuario
                                </Button>
                            </Col>
                            {this.showCardResults()}
                        </Col>
                    </Row>
                </Spin>
                <UserForm
                    mode={mode}
                    open={openForm}
                    user={user}
                    close={() => this.setState({ openForm: false })}
                    reloadSearch={this.reloadSearch}
                />
                {(visibleDelete) ? (
                    <UserDelete
                        userId={editUserId}
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

export default withRouter(UserList);