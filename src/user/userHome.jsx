import { Breadcrumb, Col, Divider, Row, Spin, Typography } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { GroupsIso, ProjectsIso, ReportsIso, TestplansIso, UsersIso } from '../CustomIcons2.js';
import { KeyOutlined } from '@ant-design/icons';
import './user.css';
import UserBadge from './userBadge';

const { Text } = Typography

class UserHome extends React.Component {
    constructor(props) {
        super(props)
        this.setLoading = this.setLoading.bind(this);
    }

    state = {
        homeOptions: [
            { key: 'passwordOption', title: 'Cambiar contraseña', icon: <KeyOutlined style={{fontSize: "60px", color: "#e0bc42"}}/>, toPath: '/account/changePassword', roles: ['account'] },
            { key: 'userOption', title: 'Gestión de usuarios', icon: <UsersIso />, toPath: '/user/admin', roles: ['admin'] },
            { key: 'groupsOption', title: 'Gestión de grupos', icon: <GroupsIso />, toPath: '/groups/admin', roles: ['admin', 'groupAdmin'] },
            { key: 'projectsOption', title: 'Gestión de proyectos', icon: <ProjectsIso />, toPath: '/projects/manage', roles: [] },
            { key: 'testplansOption', title: 'Gestión de planes de pruebas', icon: <TestplansIso />, toPath: '/testplans/manage', roles: [] },
            { key: 'reportsOption', title: 'Reportes', icon: <ReportsIso />, toPath: '/reports', roles: [] }
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
                            <Col offset={8} span={8}>
                                <UserBadge user={user} setLoading={this.setLoading} />
                                <Divider orientation="left">
                                    <Text type="secondary">Cuenta</Text>
                                </Divider>
                                {
                                    homeOptions
                                        .filter(o => o.roles.includes('account'))
                                        .map(o =>
                                            <div
                                                className="home__option"
                                                key={o.key}
                                                onClick={() => this.props.history.push(o.toPath)}
                                            >
                                                <div className="icon">
                                                    {o.icon}
                                                </div>
                                                <div className="label">
                                                    {o.title}
                                                </div>
                                            </div>
                                        )
                                }
                                {(user.role === 'admin' || user.role === 'groupAdmin') ?
                                    <>
                                        <Divider orientation="left">
                                            <Text type="secondary">Herramientas de administrador</Text>
                                        </Divider>
                                        {
                                            homeOptions
                                                .filter(o => o.roles.includes(user.role))
                                                .map(o =>
                                                    <div
                                                        className="home__option"
                                                        key={o.key}
                                                        onClick={() => this.props.history.push(o.toPath)}
                                                    >
                                                        <div className="icon">
                                                            {o.icon}
                                                        </div>
                                                        <div className="label">
                                                            {o.title}
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </> : <></>
                                }
                                <Divider orientation="left">
                                    <Text type="secondary">Herramientas de gestión</Text>
                                </Divider>
                                {
                                    homeOptions
                                        .filter(o => o.roles.length === 0)
                                        .map(o =>
                                            <div
                                                className="home__option"
                                                key={o.key}
                                                onClick={() => this.props.history.push(o.toPath)}
                                            >
                                                <div className="icon">
                                                    {o.icon}
                                                </div>
                                                <div className="label">
                                                    {o.title}
                                                </div>
                                            </div>
                                        )
                                }
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </>
        );
    }
}

export default withRouter(UserHome);