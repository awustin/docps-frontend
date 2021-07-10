import { withRouter } from "react-router";
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
    Tooltip
} from 'antd';
import {
    PlusCircleOutlined,
    EditOutlined,
    SearchOutlined
} from '@ant-design/icons';

class AdminUserView extends React.Component {    
    render() {
        const { user } = this.props
        const { Title, Paragraph } = Typography
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>                
                <Breadcrumb.Item>{user.id}</Breadcrumb.Item>
            </Breadcrumb>            
            <div className="user-view-container" style={{margin: "50px"}}>
                <Title level={3}>¡Bienvenido!</Title>
                <Row>
                    <div>Bienvenido, usuario {user.id}</div>
                    <div>Usted es administrador</div>
                </Row>
                <Divider/>
                <Title level={3}>Acciones</Title>
                <Row style={{ textAlign: "center", fontSize: "300%"}}>
                    <Col flex="1 0 33%">
                        <Tooltip title="Crear usuario">
                            <Link to={{ pathname:"/user/create"}}>
                                <PlusCircleOutlined/>
                                <Paragraph style={{ fontSize: "35%" }}>Crear usuario</Paragraph>
                            </Link>
                        </Tooltip>
                    </Col>
                    <Col flex="1 0 33%">
                        <Tooltip title="Buscar usuarios">
                            <Link to={{ pathname:"/user/search"}}>
                                <SearchOutlined/>
                                <Paragraph style={{ fontSize: "35%" }}>Buscar usuarios</Paragraph>
                            </Link>
                        </Tooltip>
                    </Col>
                    <Col flex="1 0 33%">
                        <EditOutlined/>
                        <Paragraph style={{ fontSize: "35%" }}>Modificar usuario</Paragraph>
                    </Col>
                </Row>
            </div>
            </>
        );
    }
}

export default withRouter(AdminUserView);