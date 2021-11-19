import {
    LeftCircleOutlined
} from '@ant-design/icons';
import {
    Breadcrumb, Col, Divider, Row, Tooltip, Typography
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserHome from './userHome';
import UserList from './userList';

const { Title } = Typography;

class UserMain extends React.Component {
    render() {
        const { user } = this.props
        return (
            <Switch>
                <Route exact path="/user/home" render={() => (
                    <UserHome
                        user={user}
                    />)}
                />
                <Route exact path="/user/admin" render={() => (
                    (user.role === 'admin') ? (
                        <>
                            <Breadcrumb>
                                <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
                                <Breadcrumb.Item>Gestión de usuarios</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="navigation">
                                <Row>
                                    <Col flex="1 0 25%">
                                        <Tooltip title="Atrás">
                                            <LeftCircleOutlined style={{ fontSize: "200%" }} onClick={() => { this.props.history.goBack() }} />
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </div>
                            <div className="container">
                                <Title level={2} style={{ marginBlockEnd: "0px" }}>Gestión de usuarios</Title>
                                <Divider />
                                <UserList
                                    user={user}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Ud no es administrador</div>
                    )
                )}
                />
                <Route path="/user" render={() => (
                    <Redirect to="/user/home" />)}
                />
            </Switch>
        );
    }
}

export default withRouter(UserMain);