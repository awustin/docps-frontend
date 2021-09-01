import { withRouter } from "react-router";
import React from 'react';
import { createGroup, getUsersForGroups } from '../services/groupsService';
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
    Checkbox,
		Select,
		Tag
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import MessageModal from '../common/messageModal';

class GroupCreateForm extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getUserCompleteName = this.getUserCompleteName.bind(this)
				this.closeMessageModal = this.closeMessageModal.bind(this)
				this.resetForm = this.resetForm.bind(this)
    }
    state = { 
				success: false,
        showMessageModal: false,
        message: {
					title:undefined,
					description:undefined,
					type: undefined
				},
        userList: undefined,
        targetUsers: undefined
    };

    componentDidMount() {
			getUsersForGroups().then((result)=>{
				if(result.success) {
					this.setState({ userList: result.users })						
				}
			})
    }

    handleSubmit(values) {
			if(!this.validAdmins(values))
			{
				this.setState({ 
					showMessageModal: true, 
					message: {
						title:'Entrada inválida',
						description:'Todos los administradores deben ser miembros del grupo.',
						type:'validate'
					}
				})					
			}
			else
			{
				createGroup(values).then((result)=>{
					if(!result.success) {
						if(!result.hasOwnProperty('validate'))
							this.setState({ 
								showMessageModal: true, 
								message: {
									title:'Se produjo un error',
									description:'Inténtelo de nuevo',
									type:'validate'
								}
							})
						else {
							this.setState({ 
								showMessageModal: true, 
								message: {
									title:'El nombre de grupo ya está en uso',
									description:'Debe ingresar otro nombre de grupo',
									type:'validate'
								}
							})						
						}					
					}
					else {
						this.setState({ 
							success: true,
							showMessageModal: true, 
							message: {
								title:'Grupo creado',
								description:'El grupo fue creado con éxito',
								type:'success'
							}
						})					
					}						
				})
			}
    }
		
		validAdmins(values) {
			if(!values.adminMembers)
				return true
			else
				return values.adminMembers.every(
					(admin) => {
						return values.members.includes(admin)
					}
				)		
		}
		
		closeMessageModal() {
			const { success } = this.state
			if(success)
				this.resetForm()
			this.setState({ showMessageModal: false, success: false })				
		}

    getUserCompleteName(key) {
        const { userList } = this.state
        return userList.filter((u)=>{return u.key===key})[0].completeName
    }

		resetForm() {		
			document.getElementById("createGroupForm_name").value = ''
			document.getElementById("createGroupForm").reset()
			this.setState({ targetUsers: undefined })
		}

    render() {
        const { showMessageModal, message, userList, targetUsers } = this.state
        const { user } = this.props
        const { Title, Text } = Typography
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
								<Col offset={5} span={14} style={{ marginBlockEnd: "1%" }}>
									<Text type="secondary">Seleccione uno o más usuarios del panel izquierdo y agréguelos al panel derecho para añadir como miembro.</Text>
								</Col>
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
																<div style={{fontSize:"100%"}}>{item.completeName}</div>
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
								<Form.Item
									label="Administradores"
									name="adminMembers"
								>
									<Select
										mode="multiple"
										showArrow
										options={
											(targetUsers === undefined) ? [] 
											: 
											targetUsers.map((item)=>({value: item, label:this.getUserCompleteName(item), key:item}))
										}
									/>
								</Form.Item>              
								<Form.Item {...tailLayout}>
										<Button type="primary" htmlType="submit">Crear</Button>
										<Button htmlType="button" onClick={this.resetForm} style={{ margin: '0 8px' }}>Limpiar</Button>
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

export default withRouter(GroupCreateForm);