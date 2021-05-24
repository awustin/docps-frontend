import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    List,
    Avatar,
    Tag,
    Button,
    Row,
    Col,
} from 'antd';
import { 
    EditOutlined,
    DeleteOutlined,
    PlusCircleFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

class ProjectTestplanList extends React.Component {
    constructor(props){
        super(props)
        this.statusTag = this.statusTag.bind(this)
    }
    state = {
        testplanList: []
    }

    componentDidMount() {
        let list = []
        let statuses = ['Not executed','In progress','Passed','Failed']
        for (let index = 0; index < 21; index++) {
            list.push({
                title: 'TEST-' + index,
                key: index + 1,
                id: index + 1,
                dateModified: '15/04/2021',
                status: statuses[Math.floor(Math.random() * statuses.length)]
            })                        
        }
        this.setState({ testplanList: list })
    }

    statusTag(status) {
        switch(status)
        {
            case 'Not executed':
                return <Tag color="#999997">No ejecutado</Tag>
            case 'In progress':
                return <Tag color="#ebcf52">En progreso</Tag>
            case 'Passed':
                return <Tag color="#09de8c">Pasó</Tag>
            case 'Failed':
                return <Tag color="#f50">Falló</Tag>
        }
    }

    render() {
        const { project } = this.props
        const { testplanList } = this.state
        const { Title } = Typography
        return(
            <>
            <Row style={{display: "flex", alignItems: "center", paddingBottom: "1%"}}>
                <Col flex="1 0 75%">
                    <Title level={4}>Planes de pruebas</Title>
                </Col>
                <Col flex="1 0 25%" style={{textAlign: "end"}}>
                    <Link to={{ pathname:"/testplans/create?p=" + project.projectId + "&n=" + project.projectName }}>
                        <Button style={{display: "inline-flex", alignItems: "center"}}>
                            <PlusCircleFilled style={{ color: "#b0b0b0", paddingTop: "1px"}}/>Crear plan de pruebas
                        </Button>
                    </Link>
                </Col>
            </Row>
            <List
                size="small"
                pagination={{
                    pageSize: 9
                    }}
                dataSource={testplanList}
                bordered={false}
                renderItem={item => (
                    <List.Item
                        key={item.key}
                        span={4}
                        actions={[
                            this.statusTag(item.status),
                            <Link to={{ pathname: "/testplans/" + item.id }} style={{color:"#000"}}><EditOutlined style={{ fontSize: '150%'}} /></Link>,
                            <DeleteOutlined style={{ fontSize: '150%', color: "#000"}} />
                        ]}
                        style={{background: "#fff"}}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={'Última modificación: ' + item.dateModified}
                            />
                    </List.Item>
                )}
            />
            </>
        );
    }
}

export default hot(module)(ProjectTestplanList);