import { withRouter } from "react-router";
import React from 'react';
import {
    Row,
    Col,
    Breadcrumb,
    Typography,
    Divider,
    Modal,
    Form,
    Input,
    Button,
    Alert,
    message
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';

class UserEdit extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showAlerts = this.showAlerts.bind(this)
    }
    state = {
        user: {
            id: undefined,
            createdOn: undefined,
            name: undefined,
            lastname: undefined,
            email: undefined,
            status: undefined,
            username: undefined,
            dni: undefined,
            street: undefined,
            streetNumber: undefined,
            addressExtra: undefined,
            job: undefined,
            image: undefined,
            groups: [
                {
                    name: undefined,
                    avatar: undefined
                }
            ]
        },
        validationMessage: undefined
    }

    componentDidMount() {
        const { userId } = this.props
        //Query para traer toda la info del usuario
        let user = {
            id: 999,
            createdOn: '1/06/2021',
            name: 'Juan',
            lastname: 'García',
            email: 'personal94@correo.com',
            status: 'active',
            username: 'juan.garcia',
            dni: '00000000',
            street: 'Av. Salta',
            streetNumber: '800',
            addressExtra: '4C',
            job: 'Software Engineer I',
            image: undefined,
            groups: [
                {
                    name: 'Pumas',
                    avatar: undefined
                },
                {
                    name: 'Águilas',
                    avatar: undefined
                }
            ]
        }
        this.setState({ user: user })
    }

    handleSubmit(values) {
        const { closeEdit, reloadSearch } = this.props
        //Validar correo único
        this.setState({ validationMessage: {title:'El correo electrónico ya está en uso',description:'Debe ingresar otra dirección de correo electrónico'} })
        //Validar nombre de usuario único
        this.setState({ validationMessage: {title:'El nombre de usuario ya existe',description:'Debe ingresar otro nombre de usuario'} })        
        //Query para hacer el insert del usuario
        //Enviar el mail de verificacion al usuario nuevo
        //message.success('Se ha enviado un mail de verificación al correo electrónico ingresado.')
        closeEdit()
        reloadSearch()
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

    render() {
        const { visibleEdit, closeEdit } = this.props
        const { user } = this.state
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        
        return(
            <>
                {(user.id!==undefined)?(
                    <Modal
                        title="Modificar usuario"
                        visible={visibleEdit}
                        closable={false}
                        width={700}
                        okText="Confirmar"
                        okButtonProps={{form:'editForm', key: 'submit', htmlType: 'submit'}}
                        cancelText="Cancelar"
                        onCancel={closeEdit}
                        destroyOnClose={true}                
                        maskClosable={false}
                        keyboard={false}
                    >
                        <Form {...layout}
                            name="editForm"
                            id="editForm"
                            layout="horizontal"
                            onFinish={this.handleSubmit}
                        >
                            <Form.Item 
                                label="Nombre"
                                name="name"
                                rules={[{ required: true, message: 'El nombre es requerido.' }]}
                                initialValue={user.name}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                label="Apellido"
                                name="lastname"
                                rules={[{ required: true, message: 'El apellido es requerido.' }]}
                                initialValue={user.lastname}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                label="Correo electrónico"
                                name="email"
                                rules={[{ required: true, type: "email", message: 'Debe ingresar un correo electrónico válido.' }]}
                                initialValue={user.email}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                label="Nombre de usuario"
                                name="username"
                                rules={[{ required: true, message: 'Debe ingresar un nombre de usuario válido.' }]}
                                initialValue={user.username}
                            >
                                <Input placeholder="Escriba un nombre de usuario"/>
                            </Form.Item>
                            <Form.Item 
                                label="D.N.I."
                                name="dni"
                                initialValue={user.dni}
                            >
                                <Input placeholder="Ingrese el DNI sin puntos"/>
                            </Form.Item>
                            <Form.Item 
                                label="Calle"
                                name="street"
                                initialValue={user.street}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                label="Número"
                                name="streetNumber"
                                initialValue={user.streetNumber}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item 
                                label="Información del domicilio"
                                name="addressExtra"
                                initialValue={user.addressExtra}
                            >
                                <Input placeholder="Escriba información adicional del domicilio"/>
                            </Form.Item>
                        </Form>
                        {this.showAlerts()}
                    </Modal>
                ):(<></>)}
            </>
        );
    }
}

export default withRouter(UserEdit);