import {
    LeftCircleOutlined
} from '@ant-design/icons';
import {
    Breadcrumb, Col, Divider, Row, Tooltip, Typography
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { Route, Switch } from 'react-router-dom';
import GroupList from './groupList';
import './groups.css';

const { Title } = Typography;

class GroupsMain extends React.Component {
    render() {
        const { user } = this.props
        return (
            <Switch>
                <Route path="/groups/admin" render={() => (
                    (user.role === 'admin' || user.role === 'groupAdmin') ? (
                        <>
                            <Breadcrumb>
                                <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
                                <Breadcrumb.Item>Gestión de grupos</Breadcrumb.Item>
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
                                <Title level={2} style={{ marginBlockEnd: "0px" }}>Gestión de grupos</Title>
                                <Divider />
                                <GroupList
                                    user={user}
                                />
                            </div>
                        </>
                    ) : (
                        <div>Ud no es administrador</div>
                    )
                )}
                />
            </Switch>
        );
    }
}

export default withRouter(GroupsMain);