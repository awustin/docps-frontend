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
    Alert
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import MessageModal from '../common/messageModal';

class UserCreateForm extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
				this.closeMessageModal = this.closeMessageModal.bind(this)
    }
    state = { 
				success: false,
        showMessageModal: false,
        message: {
					title:undefined,
					description:undefined,
					type: undefined
				}
    };

    handleSubmit(values) {
        //Validar correo único
        /*
				this.setState({ 
					showMessageModal: true, 
					message: {
						title:'El correo electrónico ya está en uso',
						description:'Debe ingresar otra dirección de correo electrónico',
						type:'validate'
					}
				})
				*/
        //Validar nombre de usuario único
        /*
				this.setState({ 
					showMessageModal: true, 
					message: {
						title:'El nombre de usuario ya está en uso',
						description:'Debe ingresar otro nombre de usuario',
						type:'validate'
					}
				})
				*/
        //Query para hacer el insert del usuario
        //Enviar el mail de verificacion al usuario nuevo
        this.setState({ 
					success: true,
					showMessageModal: true, 
					message: {
						title:'Usuario creado',
						description:'El mail de verificación fue enviado a '+values.email,
						type:'success'
					}
				})
    }
		
		closeMessageModal() {
			const { success } = this.state
			if(success)
				this.resetForm()
			this.setState({ showMessageModal: false, success: false })				
		}
		
		resetForm() {		
			document.getElementById("createUserForm_name").value = ''
			document.getElementById("createUserForm_last-name").value = ''
			document.getElementById("createUserForm_email").value = ''
			document.getElementById("createUserForm_username").value = ''
			document.getElementById("createUserForm_password").value = ''
			document.getElementById("createUserForm_personal-id").value = ''
			document.getElementById("createUserForm_street").value = ''
			document.getElementById("createUserForm_street-number").value = ''
			document.getElementById("createUserForm_address-extra").value = ''
			document.getElementById("createUserForm").reset()
		}

    render() {
        const { showMessageModal,message } = this.state
        const { user } = this.props
        const { Title,Text } = Typography
        const layout = {
            labelCol: { span:5 },
            wrapperCol: {  span: 14 },
        }
        const tailLayout = {
          wrapperCol: { offset: 5, span: 12 },
        }
        
        return(
            <>
						<Col offset={5} style={{ marginBlockEnd: "1%" }}>
							<Text type="secondary">Los campos marcados con * son requeridos.</Text>
						</Col>
							<Form {...layout}
									name="createUserForm"
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
											label="Apellido"
											name="last-name"
											rules={[{ required: true, message: 'El apellido es requerido.' }]}
									>
											<Input/>
									</Form.Item>
									<Form.Item 
											label="Correo electrónico"
											name="email"
											rules={[{ required: true, type: "email", message: 'Debe ingresar un correo electrónico válido.' }]}
									>
											<Input/>
									</Form.Item>
									<Form.Item 
											label="Nombre de usuario"
											name="username"
											rules={[{ required: true, message: 'Debe ingresar un nombre de usuario válido.' }]}
									>
											<Input placeholder="Escriba un nombre de usuario"/>
									</Form.Item>
									<Form.Item 
											label="Contraseña"
											name="password"
											rules={[{ required: true, message: 'Debe ingresar una contraseña válida.' }]}
									>
											<Input.Password placeholder="Escriba una contraseña" />
									</Form.Item>
									<Form.Item 
											label="D.N.I."
											name="personal-id"
									>
											<Input placeholder="Ingrese el DNI sin puntos"/>
									</Form.Item>
									<Form.Item 
											label="Calle"
											name="street"
									>
											<Input/>
									</Form.Item>
									<Form.Item 
											label="Número"
											name="street-number"
									>
											<Input/>
									</Form.Item>
									<Form.Item 
											label="Información del domicilio"
											name="address-extra"
									>
											<Input placeholder="Escriba información adicional del domicilio"/>
									</Form.Item>
									<Form.Item {...tailLayout}>
											<Button type="primary" htmlType="submit">Crear</Button>
									</Form.Item>
							</Form>
							<MessageModal								
								type={message.type}
								title={message.title}
								description={message.description}
								visible={showMessageModal}
								onClose={this.closeMessageModal}
							/>
            </>
        );
    }
}

export default withRouter(UserCreateForm);