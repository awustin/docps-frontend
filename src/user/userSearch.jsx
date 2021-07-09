import { withRouter } from "react-router";
import React from 'react';
import {
    Typography,
    Divider,
    Form,
    Input,
    Button,    
    Select,
    Breadcrumb,
    DatePicker,
    List,
    Tag,
    Avatar,
    Tooltip,
    Row,
    Col,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    LeftCircleOutlined
} from '@ant-design/icons';

const { Title } = Typography

class UserSearch extends React.Component {
    constructor(props) {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.showResults = this.showResults.bind(this)
      this.statusTag = this.statusTag.bind(this)
    }
    state = {
        statusOptions: [
            {
                value:'inactive',
                name:'Dado de baja'
            },
            {
                value:'active',
                name:'Dado de alta'
            },
            {
                value:'any',
                name:'Cualquiera'
            }
        ],
        results: undefined,
        error: undefined
    }

    handleSubmit(values) { 
        //Query para buscar usuarios
        console.log(values)
        let results = []
        let statuses = ['active','inactive']
        for (let index = 0; index < 21; index++) {
            results.push(
                {
                    key: "item"+index*2,
                    createdOn: (index+1) +'/02/2021',
                    name: "Persona",
                    lastname: "Numero"+index,
                    email: "micorreopersonal"+index+"@correo.com",
                    status: statuses[Math.floor(Math.random() * statuses.length)]
                }
            )
        }
        this.setState({ results: results })
    }

    showResults() {
        const { results } = this.state
        if(results !== undefined)
        return (
            <>
            <Divider dashed/>
            <div className="user-search-results">
                <Title level={4}>Resultados</Title>
                <List
                    size="small"
                    pagination={{
                        pageSize: 9
                        }}
                    dataSource={results}
                    bordered={false}
                    renderItem={item => (
                        <List.Item
                            key={item.key}
                            span={4}
                            actions={[
                                <Tooltip title="Modificar estado" color="#108ee9">
                                    {this.statusTag(item.status,item.key)}
                                </Tooltip>,
                                <Tooltip title="Modificar usuario" color="#108ee9">
                                    <EditOutlined style={{ fontSize: '150%', color: "#000"}}/>
                                </Tooltip>,
                                <Tooltip title="Eliminar usuario" color="#108ee9">
                                    <DeleteOutlined style={{ fontSize: '150%', color: "#000"}} />
                                </Tooltip>
                            ]}
                            style={{background: "#fff"}}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={item.name + ' ' + item.lastname}
                                description={
                                    <>
                                        {item.email} | <i>Creado en: </i>{item.createdOn}
                                    </>
                                }
                                />
                        </List.Item>
                    )}
                />
            </div>
            </>
        )
    }
    
    statusTag(status,itemKey) {
        switch(status)
        {
            case 'active':
                return <Tag key={itemKey+'09de8c'} color="#09de8c" onClick={()=>{console.log('Dar de baja')}}>De alta</Tag>
            case 'inactive':
                return <Tag key ={itemKey+'999997'} color="#999997" onClick={()=>{console.log('Dar de alta')}}>De baja</Tag>
            default:
                break
        }
    }

    render() {
        const { user } = this.props
        const { statusOptions } = this.state
        const { Option } = Select
        const { RangePicker } = DatePicker
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        const tailLayout = {
          wrapperCol: { offset: 7, span: 12 },
        }
        return(            
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>                
                <Breadcrumb.Item>{user.id}</Breadcrumb.Item>
                <Breadcrumb.Item>Buscar usuarios</Breadcrumb.Item> 
            </Breadcrumb>
            <div className="user-search-navigation" style={{margin: "50px"}}>
                <Row>
                    <Col>
                        <Tooltip title="Atrás">
                            <LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.push("/user")}}/>
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div className="user-search-container" style={{margin: "50px"}}>
                <Title level={3}>Buscar usuarios</Title>
                <Divider dashed></Divider>
                <Form {...layout}
                    name="userSearch"
                    layout="horizontal"
                    onFinish={this.handleSubmit}
                >
                    <Form.Item
                        label="Nombre"
                        name="name"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Correo electrónico"
                        name="email"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Fecha de creación"
                        name="createdOn"
                    >
                        <RangePicker/>
                    </Form.Item>
                    <Form.Item
                        label="Estado"
                        name="status"
                        initialValue={statusOptions[2].value}
                    >
                        <Select>
                            {statusOptions.map(item => (<Option key={item.value} value={item.value}>{item.name}</Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Buscar</Button>
                    </Form.Item>
                </Form>
                {this.showResults()}
            </div>
            </>
        );
    }
}

export default withRouter(UserSearch);