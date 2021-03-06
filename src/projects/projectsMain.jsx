import { LeftCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Divider, Row, Tooltip, Typography } from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import { Route, Switch } from 'react-router-dom';
import ProjectList from './projectList';
import Project from './project';

const { Title } = Typography;

class ProjectsMain extends React.Component {
    render() {
        const { user } = this.props
        return (
            <Switch>
                <Route path="/projects/manage" render={() => (
                    <>
                        <Breadcrumb>
                            <Breadcrumb.Item>{user.name}</Breadcrumb.Item>
                            <Breadcrumb.Item>Gestión de proyectos</Breadcrumb.Item>
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
                            <Title level={2} style={{ marginBlockEnd: "0px" }}>Gestión de proyectos</Title>
                            <Divider />
                            <ProjectList
                                user={user}
                            />
                        </div>
                    </>
                )}
                />
                <Route path="/projects/id=:id" render={() => (
                    <Project
                        user={user}
                    />
                )}
                />
                <Route path="/projects" render={() => (
                    <div> Not found :( </div>)}
                />
            </Switch>
        );
    }
}

export default withRouter(ProjectsMain);