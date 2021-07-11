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

class GroupSearch extends React.Component {
    constructor(props) {
      super(props)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.showResults = this.showResults.bind(this)
      this.statusTag = this.statusTag.bind(this)
      this.reloadSearch = this.reloadSearch.bind(this)
    }
    state = {
        lastValues: undefined,
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
        error: undefined,
        visibleEdit: false,
        visibleDelete: false,
        editUserId: undefined
    }

    handleSubmit(values) { 
        //Query para buscar grupos
        let results = []
        let statuses = ['active','inactive']
        for (let index = 0; index < 21; index++) {
            results.push(
                {
                    key: "item"+index*2,
                    id: index*10,
                    createdOn: (index+1) +'/02/2021',
                    name: "Grupo numero "+index,
                    status: statuses[Math.floor(Math.random() * statuses.length)],
                    avatar: "image"
                }
            )
        }
        this.setState({ results: results, lastValues: values })
    }

    reloadSearch() {
        const { lastValues } = this.state
        if( lastValues !== undefined )
        {
            //Query para hacer la busqueda de grupos con lastValues
            let results = []
            let statuses = ['active','inactive']
            for (let index = 0; index < 21; index++) {
                results.push(
                    {
                        key: "item"+index*2,
                        id: index*10,
                        createdOn: (index+1) +'/02/2021',
                        name: "Grupo modificado numero "+index,
                        status: statuses[Math.floor(Math.random() * statuses.length)],
                        avatar: "image"
                    }
                )
            }
            this.setState({ results: results })
        }
    }
    
    statusTag(status,itemKey) {
        switch(status)
        {
            case 'active':
                return <Tag key={itemKey+'09de8c'} color="#09de8c">De alta</Tag>
            case 'inactive':
                return <Tag key ={itemKey+'999997'} color="#999997">De baja</Tag>
            default:
                break
        }
    }

    showResults() {
        const { results } = this.state
        if(results !== undefined)
        return (
            <>
            <Divider dashed/>
            <div className="group-search-results">
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
                                    this.statusTag(item.status,item.key),
                                <Tooltip title="Modificar grupo" color="#108ee9">
                                    <EditOutlined style={{ fontSize: '150%', color: "#000"}} onClick={()=>{this.setState({ visibleEdit: true, editUserId: item.id })}}/>
                                </Tooltip>,
                                <Tooltip title="Eliminar grupo" color="#108ee9">
                                    <DeleteOutlined style={{ fontSize: '150%', color: "#000"}} onClick={()=>{this.setState({ visibleDelete: true, editUserId: item.id })}}/>
                                </Tooltip>
                            ]}
                            style={{background: "#fff"}}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={item.name}
                                description={
                                    <>
                                        <i>Creado en: </i>{item.createdOn}
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

    render() {
        const { user } = this.props
        const { statusOptions, visibleEdit, visibleDelete, editUserId } = this.state
        const { Option } = Select
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
                <Breadcrumb.Item>Buscar grupos</Breadcrumb.Item> 
            </Breadcrumb>
            <div className="group-search-navigation" style={{margin: "50px"}}>
                <Row>
                    <Col>
                        <Tooltip title="Atrás">
                            <LeftCircleOutlined style={{ fontSize:"200%" }} onClick={()=>{this.props.history.push("/user")}}/>
                        </Tooltip>
                    </Col>
                </Row>
            </div>
            <div className="group-search-container" style={{margin: "50px"}}>
                <Title level={3}>Buscar grupos</Title>
                <Divider dashed></Divider>
                <Form {...layout}
                    name="groupSearch"
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
            { (visibleEdit) ? (           
                <div>Hola =) </div>
            ) : (
                <></>
            )}
            { (visibleDelete) ? (           
                <div>Chau =) </div>
            ) : (
                <></>
            )}
            </>
        );
    }
}

export default withRouter(GroupSearch);