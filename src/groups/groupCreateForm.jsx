import { withRouter } from "react-router";
import React from 'react';
import { 
    Row,
    Col,
    Form,
    Button,
    Breadcrumb,
    Typography,
    Divider,
    Modal,
    Input,
    Alert,
    message,
    Transfer,
    Checkbox
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';

class GroupCreateForm extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showAlerts = this.showAlerts.bind(this)
        this.getUserCompleteName = this.getUserCompleteName.bind(this)
    }
    state = { 
        userList: undefined,
        targetUsers: undefined,
        cancelModalvisible: false,
        validationMessage: undefined,
    };

    componentDidMount() {
        //Query para traer todos los usuarios
        //traer un array con TODOS los usuarios elegibles
        let users = []
        for (let index = 0; index < 20; index++) {
            users.push(
                {
                    key:'user'+index*10,
                    id:index*10,
                    completeName: 'Persona ' + index + ' Apellido'
                }
            )
        }
        this.setState({ userList: users })
    }

    handleSubmit(values) {
        console.log(values)
        //Validar nombre de usuario único
        this.setState({ validationMessage: {title:'El nombre de grupo ya existe',description:'Debe ingresar otro nombre de grupo'} })        
        //Query para hacer el insert del usuario
        //Enviar el mail de verificacion al usuario nuevo
        message.success('Grupo creado con éxito.')
    }

    showAlerts() {
        const { validationMessage } = this.state
        if(validationMessage !== undefined)
        {
            return(
                <Alert
                message={validationMessage.title}
                description={validationMessage.description}
                type="error"
                showIcon
                />
            )
        }
    }

    getUserCompleteName(key) {
        const { userList } = this.state
        return userList.filter((u)=>{return u.key===key})[0].completeName
    }

    render() {
        const { userList, targetUsers, cancelModalvisible } = this.state
        const { user } = this.props
        const { Title } = Typography
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        }
        const tailLayout = {
          wrapperCol: { offset: 4, span: 12 },
        }
        
        return(
            <>
            <Breadcrumb>
                <Breadcrumb.Item>Usuario</Breadcrumb.Item>
                <Breadcrumb.Item>{user.id}</Breadcrumb.Item>
                <Breadcrumb.Item>Crear grupo</Breadcrumb.Item>
            </Breadcrumb>            
            <div className="create-group-form-container" style={{margin: "50px"}}>
                <Title level={3}>Crear grupo</Title>
                <Divider/>
                <Form {...layout}
                    name="createGroupForm"
                    layout="horizontal"
                    onFinish={this.handleSubmit}
                >
                    <Form.Item 
                        label="Nombre"
                        name="name"
                        rules={[{ required: true, message: 'El nombre es requerido.' }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item 
                        label="Miembros"
                        name="members"
                        rules={[{ required: true, message: 'Ingrese al menos un miembro' }]}
                    >
                        <Transfer
                            dataSource={userList}
                            titles={['Usuarios', 'Miembros']}
                            render={(item) => 
                                <>
                                    <div style={{fontSize:"85%"}}>{item.completeName}</div>
                                </>
                            }
                            showSearch
                            filterOption={(value,option)=>{return option.completeName.toUpperCase().indexOf(value.toUpperCase()) > -1}}
                            onChange={(sel)=>{this.setState({targetUsers:sel})}}
                            targetKeys={targetUsers}
                            listStyle={{height:"500px", width:"50%"}}
                            locale={{itemUnit:"", itemsUnit:""}}
                        >
                        </Transfer>
                    </Form.Item>
                    <Form.List 
                        name="groupAdminUsers"
                    >
                    {()=> (
                        <>
                            {
                                (targetUsers === undefined) ? [] : targetUsers.map((item)=>(
                                        <Form.Item
                                            label="Administrador/a de grupo"
                                            name={[item,'isAdmin']}
                                            valuePropName="checked"
                                            initialValue={false}
                                            key={item}
                                        >
                                            <Checkbox>{this.getUserCompleteName(item)}</Checkbox>
                                        </Form.Item>
                                        )
                                    )
                            }
                        </>
                        )
                    }
                    </Form.List>                
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">Crear</Button>
                        <Button htmlType="button" onClick={() => { this.setState({cancelModalvisible:true}) }} style={{ margin: '0 8px' }}>Cancelar</Button>
                    </Form.Item>
                </Form>
                <div className="alerts-container">
                    {this.showAlerts()}
                </div>
            </div>
            <Modal
                visible={cancelModalvisible}
                closable={false}
                width={300}
                onOk={() => { 
                    this.setState({cancelModalvisible:false}) 
                    this.props.history.push('/user')
                }}
                onCancel={() => { this.setState({cancelModalvisible:false}) }}
                okText="Salir"
                cancelText="Cancelar"
            >
            <Row>
                <Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
                <ExclamationCircleOutlined style={{color:"#ffc02e"}} />
                </Col>
                <Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
                ¿Salir de la creación del grupo?
                </Col>
            </Row>
            </Modal>
            </>
        );
    }
}

export default withRouter(GroupCreateForm);