import {
    DeleteOutlined, EditOutlined, PlusCircleOutlined
} from '@ant-design/icons';
import {
    Avatar, Button, Col, DatePicker, Divider, Form,
    Input, List, Row, Select, Space, Spin, Tag, Tooltip, Typography
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import '../CustomStyles.css';
import { getUserInfoById, searchUsers } from '../services/usersService';
import { datePickerRangeConvert } from '../utils/format';
import UserDelete from './modals/userDelete';
import UserForm from './userForm';

const { Text } = Typography

class UserList extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showResults = this.showResults.bind(this)
        this.statusTag = this.statusTag.bind(this)
        this.reloadSearch = this.reloadSearch.bind(this)
        this.updateUser = this.updateUser.bind(this)
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
        user: undefined,
        openForm: false,
        mode: 'add',
        loading: false
    }

    handleSubmit(values) {
        values.createdOn = (values.createdOn) ? datePickerRangeConvert(values.createdOn) : undefined
        this.setState({ loading: true })
        searchUsers(values).then((result) => {
            let { success, users } = result
            if (success) {
                this.setState({ results: users, lastValues: values })
            }
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
                return <Tag key={itemKey + 'green'} color="green" onClick={() => { console.log('Dar de baja') }}>Activo</Tag>
            case 'inactive':
                return <Tag key={itemKey + 'red'} color="volcano" onClick={() => { console.log('Dar de alta') }}>Inactivo</Tag>
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

    showResults() {
        const { results } = this.state
        if (results !== undefined)
            return (
                <>
                    <div className="user-search-results">
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
                                    actions={[
                                        <>
                                            {this.statusTag(item.status, item.key)}
                                        </>,
                                        <Tooltip key={`edit-${item.key}`} title="Modificar usuario" color="#108ee9">
                                            <EditOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => this.updateUser(item.id)} />
                                        </Tooltip>,
                                        <Tooltip key={`delete-${item.key}`} title="Eliminar usuario" color="#108ee9">
                                            <DeleteOutlined style={{ fontSize: '150%', color: "#228cdbff" }} onClick={() => { this.setState({ visibleDelete: true, editUserId: item.id }) }} />
                                        </Tooltip>
                                    ]}
                                    className={'list-item'}
                                    style={{ background: "#fff" }}
                                >
                                    <List.Item.Meta
                                        avatar={(item.avatar) ? (
                                            <Avatar src={item.avatar} />
                                        ) : (
                                            <Avatar className={"userdefavatar" + Math.floor(Math.random() * 5)} />
                                        )}
                                    />
                                    <Space direction="vertical" size={5} style={{ width: '100%' }}>
                                        <Row>
                                            <div className={'list-item description'}>
                                                <Text className={'date hideable'} key={item.key + 'created'} type="secondary"><i> Fecha de creación: {item.createdOn}</i></Text>
                                            </div>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col>
                                                <Text className={'list-item-main-content'}>{item.name + ' ' + item.lastname}</Text>
                                            </Col>
                                            <Col>
                                                <Text className={'list-item-secondary-content'}>{item.email}</Text>
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
                        </Col>
                        <Col span={1}>
                            <Divider type="vertical" style={{ height: "100%" }} dashed />
                        </Col>
                        <Col span={16}>
                            <Col style={{ textAlign: "end", marginBlockEnd: "1%" }}>
                                <Button
                                    icon={<PlusCircleOutlined />}
                                    type="primary"
                                    onClick={() => this.setState({ openForm: true, mode: 'add', user: undefined })}
                                >
                                    Crear usuario
                                </Button>
                            </Col>
                            {this.showResults()}
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
                        closeDelete={(() => { this.setState({ visibleDelete: false }) })}
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