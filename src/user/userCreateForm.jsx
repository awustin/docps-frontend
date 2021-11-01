import {
	Button, Col, Form,
	Input, Typography
} from 'antd';
import React from 'react';
import { withRouter } from "react-router";
import MessageModal from '../common/messageModal';
import {
	createUser
} from '../services/usersService';

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
			createUser(values).then((result)=>{
				if(!result.success)
				{
						if(!result.hasOwnProperty('validate'))
							this.setState({ 
								showMessageModal: true, 
								message: {
									title:'Se produjo un error',
									description:'Inténtelo de nuevo',
									type:'validate'
								}
							})
						else
						{
							switch(result.validate)
							{
								case 'EXISTING EMAIL':
									this.setState({ 
										showMessageModal: true, 
										message: {
											title:'El correo electrónico ya está en uso',
											description:'Debe ingresar otra dirección de correo electrónico',
											type:'validate'
										}
									})
									break
								case 'EXISTING NAME':
									this.setState({ 
										showMessageModal: true, 
										message: {
											title:'El nombre de usuario ya está en uso',
											description:'Debe ingresar otro nombre de usuario',
											type:'validate'
										}
									})
									break
								default:
									break
							}						
						}				
				}
				else
				{
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
			document.getElementById("createUserForm_lastName").value = ''
			document.getElementById("createUserForm_email").value = ''
			document.getElementById("createUserForm_username").value = ''
			document.getElementById("createUserForm_password").value = ''
			document.getElementById("createUserForm_dni").value = ''
			document.getElementById("createUserForm_street").value = ''
			document.getElementById("createUserForm_streetNum").value = ''
			document.getElementById("createUserForm_addressExtra").value = ''
			document.getElementById("createUserForm_job").value = ''
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
											name="lastName"
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
											name="dni"
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
											name="streetNum"
									>
											<Input/>
									</Form.Item>
									<Form.Item 
											label="Información del domicilio"
											name="addressExtra"
									>
											<Input placeholder="Escriba información adicional del domicilio"/>
									</Form.Item>
									<Form.Item 
											label="Puesto"
											name="job"
									>
											<Input/>
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