import { withRouter } from "react-router";
import React from 'react';
import { getGroupAndMembersById, getUsersForGroups, updateGroup } from '../../services/groupsService';
import {
    Modal,
    Form,
    Input,
    Row,
    Col,
    Select,
    Transfer,
    Avatar
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import MessageModal from '../../common/messageModal';

const { Option } = Select

class GroupEdit extends React.Component {
    constructor(props){
			super(props)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.validAdmins = this.validAdmins.bind(this)
			this.getUserCompleteName = this.getUserCompleteName.bind(this)
			this.getUserisAdmin = this.getUserisAdmin.bind(this)
			this.closeMessageModal = this.closeMessageModal.bind(this)
    }
		
    state = {
			group: {
					id: undefined,
					createdOn: undefined,
					name: undefined,
					status: undefined,
					avatar: undefined,
					groupMembers: [],
					adminMembers: []
			},
			userList: [],
			targetUsers: [],
			statusOptions: [
					{
							value:'active',
							name:'Activo'
					},
					{
							value:'inactive',
							name:'Inactivo'
					}
			],
			showCancelModal: false,
			showMessageModal: false,
			message: {
				title:undefined,
				description:undefined,
				type: undefined
			},
			success: false,
			loading: true
    }

    componentDidMount() {
			const { groupId } = this.props
			Promise.all([
				getUsersForGroups(),
				getGroupAndMembersById(groupId)
			]).then(([res1,res2]) => {
					if(res1.success && res2.success)
						this.setState({ 
							userList: res1.users, 
							targetUsers: res2.group.groupMembers.map(e=>e.key), 
							group: res2.group,
							loading: false 
						})
				})
    }

    getUserCompleteName(key) {
			const { userList } = this.state
			if(key)
				return userList.filter((u)=>{return u.key===key})[0].completeName
    }

    getUserisAdmin(key) {
			const { group } = this.state
			let user = group.groupMembers.filter((u)=>{return u.key===key})[0]
			return (user) ? user.isAdmin : false
    }

    handleSubmit(values) {
			const { group } = this.state
			values.id = group.id
			console.log(values)
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
				updateGroup(values).then((result)=>{
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
								title:'Grupo modificado',
								description:'El grupo fue modificado con éxito',
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
			const { closeEdit, reloadSearch } = this.props
			const { success } = this.state
			if(success) {
				reloadSearch()
				closeEdit()
			}
			this.setState({ showMessageModal: false })
		}
		
		render() {
			const { visibleEdit, closeEdit } = this.props
			const { group, userList, targetUsers, showCancelModal, showMessageModal, statusOptions, loading, message } = this.state
			const layout = {
					labelCol: { span: 3 },
					wrapperCol: { span: 18 },
			}
			if(loading)
				return(<></>)
			return(
				<>
				<Modal
						title="Modificar grupo"
						visible={visibleEdit}
						closable={false}
						width={1100}
						okText="Confirmar"
						okButtonProps={{form:'editForm', key: 'submit', htmlType: 'submit'}}
						cancelText="Cancelar"
						onCancel={()=>{this.setState({showCancelModal:true})}}
						destroyOnClose={true}                
						maskClosable={false}
						keyboard={false}
				>
						<Row style={{ height:"100%", justifyContent:"center", marginBlock:"3%" }}>
								<Col style={{textAlign:"center",alignSelf:"center"}}>
										{ (group.avatar) ? (
										<Avatar
												size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
												src={group.avatar}
										/>																
											)
											: (
										<Avatar
												size={{ xs: 100, sm: 100, md: 100, lg: 100, xl: 100, xxl: 100 }}
												className={group.defaultAvatar}
										/>		
											)
										}
								</Col>
						</Row>   
						<Form {...layout}
								name="editForm"
								id="editForm"
								layout="horizontal"
								onFinish={this.handleSubmit}
						>
								<Form.Item
										label="Estado"
										name="status"
										initialValue={group.status}
								>
										<Select>
												{statusOptions.map(item => (<Option key={item.value} value={item.value}>{item.name}</Option>))}
										</Select>
								</Form.Item>
								<Form.Item 
										label="Nombre"
										name="name"
										rules={[{ required: true, message: 'El nombre es requerido.' }]}
										initialValue={group.name}
								>
										<Input/>
								</Form.Item>
								<Form.Item 
										label="Miembros"
										name="members"
										rules={[{ required: true, message: 'Ingrese al menos un miembro' }]}
										initialValue={group.groupMembers.map( e => e.key)}
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
								<Form.Item
									label="Administradores"
									name="adminMembers"
									initialValue={group.adminMembers}
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
						</Form>
				</Modal>
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
								¿Salir de la modificación del grupo?
								</Col>
						</Row>
				</Modal>
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

export default withRouter(GroupEdit);