import { Breadcrumb, Card, Col, Divider, Row, Space, Spin, Typography, Alert } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { GroupsIso, PasswordIso, ProjectsIso, ReportsIso, TestplansIso, UsersIso } from '../CustomIcons2.js';
import './user.css';
import UserBadge from './userBadge';
import { connect } from 'react-redux';

const { Text } = Typography;
const { Meta } = Card;

class UserHome extends React.Component {
    constructor(props) {
        super(props)
        this.setLoading = this.setLoading.bind(this);
    }

    state = {
        homeOptions: [
            { key: 'passwordOption', title: 'Cambiar contraseña', icon: <PasswordIso className="icon" />, toPath: '/account/changePassword', roles: ['account'] },
            { key: 'userOption', title: 'Gestión de usuarios', icon: <UsersIso className="icon" />, toPath: '/user/admin', roles: ['admin'] },
            { key: 'groupsOption', title: 'Gestión de grupos', icon: <GroupsIso className="icon" />, toPath: '/groups/admin', roles: ['admin', 'groupAdmin'] },
            { key: 'projectsOption', title: 'Gestión de proyectos', icon: <ProjectsIso className="icon" />, toPath: '/projects/manage', roles: [] },
            { key: 'testplansOption', title: 'Gestión de planes', icon: <TestplansIso className="icon" />, toPath: '/testplans/manage', roles: [] },
            { key: 'reportsOption', title: 'Reportes', icon: <ReportsIso className="icon" />, toPath: '/reports', roles: [] }
        ],
        loading: false
    }

    setLoading(value) {
        this.setState({ loading: value })
    }

    render() {
        const { user } = this.props;
        const { homeOptions, loading } = this.state
        return (
            <>
                <Spin spinning={loading} size="large">
                    <Breadcrumb>
                        <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                        <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="home">
                        <Row>
                            <Col offset={6} span={12}>
                                <UserBadge user={user} setLoading={this.setLoading} />
                                {(!user.memberOf[0].id) ?
                                    <Alert
                                        message="Usted no pertenece a ningún grupo."
                                        description="Para poder gestionar proyectos y planes de prueba, debe ser miembro de al menos un grupo."
                                        type="info"
                                        showIcon
                                        closable={false}
                                    />
                                    : <></>
                                }
                                <Divider orientation="left">
                                    <Text type="secondary">Cuenta</Text>
                                </Divider>
                                <Space>
                                    {
                                        homeOptions
                                            .filter(o => o.roles.includes('account'))
                                            .map(o =>
                                                <Card
                                                    key={o.key}
                                                    className="home__option"
                                                    onClick={() => this.props.history.push(o.toPath)}
                                                    hoverable
                                                    cover={
                                                        <div className="cover" align="center">
                                                            {o.icon}
                                                        </div>
                                                    }
                                                >
                                                    <Meta
                                                        className="home__option__meta"
                                                        title={o.title}
                                                    />
                                                </Card>
                                            )
                                    }
                                </Space>
                                {(user.role === 'admin' || user.role === 'groupAdmin') ?
                                    <>
                                        <Divider orientation="left">
                                            <Text type="secondary">Herramientas de administrador</Text>
                                        </Divider>
                                        <Space>
                                            {
                                                homeOptions
                                                    .filter(o => o.roles.includes(user.role))
                                                    .map(o =>
                                                        <Card
                                                            key={o.key}
                                                            className="home__option"
                                                            onClick={() => this.props.history.push(o.toPath)}
                                                            hoverable
                                                            cover={
                                                                <div className="cover" align="center">
                                                                    {o.icon}
                                                                </div>
                                                            }
                                                        >
                                                            <Meta
                                                                className="home__option__meta"
                                                                title={o.title}
                                                            />
                                                        </Card>
                                                    )
                                            }
                                        </Space>
                                    </> : <></>
                                }
                                <Divider orientation="left">
                                    <Text type="secondary">Herramientas de gestión</Text>
                                </Divider>
                                <Space>
                                    {
                                        homeOptions
                                            .filter(o => o.roles.length === 0)
                                            .map(o =>
                                                <Card
                                                    key={o.key}
                                                    className="home__option"
                                                    onClick={() => this.props.history.push(o.toPath)}
                                                    hoverable
                                                    cover={
                                                        <div className="cover" align="center">
                                                            {o.icon}
                                                        </div>
                                                    }
                                                >
                                                    <Meta
                                                        className="home__option__meta"
                                                        title={o.title}
                                                    />
                                                </Card>
                                            )
                                    }
                                </Space>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(UserHome));