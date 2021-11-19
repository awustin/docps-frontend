import {
    Breadcrumb, Divider, Typography, Space, Card
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { ReportsIso, UsersIso, GroupsIso, ProjectsIso, TestplansIso } from '../CustomIcons2.js';
import UserBadge from './userBadge';

const { Text } = Typography

class UserHome extends React.Component {
    state = {
        homeOptions: [
            { key: 'userOption', title: 'Gestión de usuarios', icon: <UsersIso />, toPath: '/user/admin', roles: ['admin'] },
            { key: 'groupsOption', title: 'Gestión de grupos', icon: <GroupsIso />, toPath: '/groups/admin', roles: ['admin', 'groupAdmin'] },
            { key: 'projectsOption', title: 'Gestión de proyectos', icon: <ProjectsIso />, toPath: '/projects/manage', roles: [] },
            { key: 'testplansOption', title: 'Gestión de planes de pruebas', icon: <TestplansIso />, toPath: '/testplans/manage', roles: [] },
            { key: 'reportsOption', title: 'Reportes', icon: <ReportsIso />, toPath: '/reports', roles: [] }
        ]
    }

    render() {
        const { user } = this.props;
        const { homeOptions } = this.state
        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                    <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="container">
                    <UserBadge
                        user={user}
                    />
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
            </>
        );
    }
}

export default withRouter(UserHome);