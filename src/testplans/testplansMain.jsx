import { LeftCircleOutlined } from '@ant-design/icons';
import {
    Breadcrumb, Col, Divider, Row, Tooltip, Typography
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { Route, Switch } from 'react-router-dom';
import Testplan from './testplan';
import TestplanExport from './testplanExport';
import TestplanList from './testplanList';

const { Title } = Typography;

class TestplansMain extends React.Component {
    render() {
        const { user } = this.props
        return (
            <Switch>
                <Route exact path="/testplans/manage" render={() => (
                    <>
                        <Breadcrumb>
                            <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>Gestión de planes de pruebas</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="navigation">
                            <Row>
                                <Col flex="1 0 25%">
                                    <Tooltip title="Atrás">
                                        <LeftCircleOutlined style={{ fontSize: "200%" }} onClick={() => { this.props.history.push('/home') }} />
                                    </Tooltip>
                                </Col>
                            </Row>
                        </div>
                        <div className="container">
                            <Title level={2} style={{ marginBlockEnd: "0px" }}>Gestión de planes de pruebas</Title>
                            <Divider />
                            <TestplanList
                                user={user}
                            />
                        </div>
                    </>
                )}
                />
                <Route exact path="/testplans/id=:testplanId" render={() => (
                    <Testplan
                        user={user}
                    />
                )}
                />
                <Route exact path="/testplans/export=:id" render={() => (
                    <TestplanExport
                        user={user}
                    />
                )}
                />
                <Route path="/testplans" render={() => (
                    <div> Not found :( </div>)}
                />
            </Switch>
        );
    }
}

export default withRouter(TestplansMain);