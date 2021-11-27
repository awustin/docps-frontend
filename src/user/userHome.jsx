import { Breadcrumb, Card, Divider, Space, Spin, Typography } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { GroupsIso, ProjectsIso, ReportsIso, TestplansIso, UsersIso } from '../CustomIcons2.js';
import UserBadge from './userBadge';

const { Text } = Typography

class UserHome extends React.Component {
    constructor(props) {
        super(props)
        this.setLoading = this.setLoading.bind(this);
    }

    state = {
        homeOptions: [
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
                    <div className="container">
                        <UserBadge user={user} setLoading={this.setLoading} />
                        {(user.role === 'admin' || user.role === 'groupAdmin') ?
                            <>
                                <Divider orientation="left">
                                    <Text type="secondary">Herramientas de administrador</Text>
                                </Divider>
                                <Space size={24}>
                                    {
                                        homeOptions
                                            .filter(o => o.roles.includes(user.role))
                                            .map(o =>
                                                <Card
                                                    key={o.key}
                                                    hoverable
                                                    className="home-option"
                                                    title={o.title}
                                                    onClick={() => this.props.history.push(o.toPath)}
                                                >
                                                    <Space direction="vertical">
                                                        <Space direction="vertical">
                                                            {o.icon}
                                                        </Space>
                                                    </Space>
                                                </Card>
                                            )
                                    }
                                </Space>
                            </> : <></>
                        }
                        <Divider orientation="left">
                            <Text type="secondary">Herramientas de gestión</Text>
                        </Divider>
                        <Space size={24}>
                            {
                                homeOptions
                                    .filter(o => o.roles.length === 0)
                                    .map(o =>
                                        <Card
                                            key={o.key}
                                            hoverable
                                            className="home-option"
                                            title={o.title}
                                            onClick={() => this.props.history.push(o.toPath)}
                                        >
                                            <Space direction="vertical">
                                                <Space direction="vertical">
                                                    {o.icon}
                                                </Space>
                                            </Space>
                                        </Card>
                                    )
                            }
                        </Space>
                    </div>
                </Spin>
            </>
        );
    }
}

export default withRouter(UserHome);