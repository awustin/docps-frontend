import { withRouter } from "react-router";
import React from 'react';
import {
	getUserInfoById,
	updateUser
} from '../../services/usersService';
import {
    Modal,
    Form,
    Input,
    Alert,
    Row,
    Col,
    Select
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import MessageModal from '../../common/messageModal';

const { Option } = Select

class UserEdit extends React.Component {
	constructor(props){
			super(props)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.showAlerts = this.showAlerts.bind(this)
			this.closeMessageModal = this.closeMessageModal.bind(this)
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
			statusOptions: [
					{
							value:'active',
							name:'De alta'
					},
					{
							value:'inactive',
							name:'De baja'
					}
			],
			validationMessage: undefined,
			showCancelModal: false,
			showMessageModal: false,
			success: false,
			message: {
				title:undefined,
				description:undefined,
				type: undefined
			}
	}

	componentDidMount() {
		const { userId } = this.props
		getUserInfoById(userId).then((result)=>{
			let { success, user } = result
			if(success)
				this.setState({ user: user })
		})
	}

	handleSubmit(values) {
	 const { userId, closeEdit, reloadSearch } = this.props
		values.id = userId
		updateUser(values).then((result)=>{
			if(!result.success)
			{
					if(!result.hasOwnProperty('validate'))
						this.setState({ 
							validationMessage: {
								title:'Se produjo un error',
								description:'Inténtelo de nuevo'
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
						title:'Usuario modificado',
						description:'Se han guardado los datos con éxito',
						type:'success'
					}
				})		
			}
		})
	}	
		
	closeMessageModal() {
		const { success } = this.state
		const { closeEdit, reloadSearch } = this.props
		if(success)
		{
			closeEdit()
			reloadSearch()	
		}
		this.setState({ showMessageModal: false, success: false })				
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
        const { user, showCancelModal, statusOptions, showMessageModal, message } = this.state
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        
        return(
            <>
                {(user.id!==undefined)?(
                    <>
                    <Modal
                        title="Modificar usuario"
                        visible={visibleEdit}
                        closable={false}
                        width={700}
                        okText="Confirmar"
                        okButtonProps={{form:'editForm', key: 'submit', htmlType: 'submit'}}
                        cancelText="Cancelar"
                        onCancel={()=>{this.setState({showCancelModal:true})}}
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
                                label="Estado"
                                name="status"
                                initialValue={user.status}
                            >
                                <Select>
                                    {statusOptions.map(item => (<Option key={item.value} value={item.value}>{item.name}</Option>))}
                                </Select>
                            </Form.Item>
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
																<Form.Item 
																		label="Puesto"
																		name="job"
                               initialValue={user.job}
																>
																		<Input/>
																</Form.Item>
                        </Form>
                        {this.showAlerts()}
                    </Modal>
												<MessageModal								
													type={message.type}
													title={message.title}
													description={message.description}
													visible={showMessageModal}
													onClose={this.closeMessageModal}
												/>
                    <Modal
                        visible={showCancelModal}
                        closable={false}
                        width={400}
                        onOk={() => { 
                            this.setState({showCancelModal:false})
                            closeEdit()
                        }}
                        onCancel={() => { this.setState({showCancelModal:false}) }}
                        okText="Salir"
                        cancelText="Cancelar"
                    >
                        <Row>
                            <Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
                            <ExclamationCircleOutlined style={{color:"#ffc02e"}} />
                            </Col>
                            <Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
                            ¿Salir de la modificación del usuario?
                            </Col>
                        </Row>
                    </Modal>
                    </>
                ):(<></>)}
            </>
        );
    }
}

export default withRouter(UserEdit);