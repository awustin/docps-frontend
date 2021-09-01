import { withRouter } from "react-router";
import React from 'react';
import { getGroupAndMembersById, getUsersForGroups } from '../../services/groupsService';
import {
    Modal,
    Form,
    Input,
    Alert,
    Row,
    Col,
    Select,
    Transfer,
    Checkbox,
    Avatar,
    Divider
} from 'antd';
import {
    ExclamationCircleOutlined,
    AntDesignOutlined,
} from '@ant-design/icons';

const { Option } = Select

class GroupEdit extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showAlerts = this.showAlerts.bind(this)
        this.getUserCompleteName = this.getUserCompleteName.bind(this)
        this.getUserisAdmin = this.getUserisAdmin.bind(this)
    }
		
    state = {
			group: {
					id: undefined,
					createdOn: undefined,
					name: undefined,
					status: undefined,
					avatar: undefined,
					groupMembers: []
			},
			userList: [],
			targetUsers: [],
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
			loading: true
    }

    componentDidMount() {
			const { groupId } = this.props
			Promise.all([
				getUsersForGroups(),
				getGroupAndMembersById(groupId)
			])
			.then(([res1,res2]) => {
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
        console.log(values)
        const { closeEdit, reloadSearch } = this.props
        //Validar nombre de usuario único
        this.setState({ validationMessage: {title:'El nombre de grupo ya existe',description:'Debe ingresar otro nombre de grupo'} })        
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
			const { group, userList, targetUsers, showCancelModal, statusOptions, loading } = this.state
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
						width={900}
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
								{(targetUsers === undefined) ? (<></>) : (<Divider>Administradores de grupo</Divider>)}
								<Form.List {...layout}
										name="groupMembers"
								>
								{()=> (
										<>
												{
														(targetUsers === undefined) ? [] : targetUsers.map((item)=>(
						<Form.Item
							style={{marginLeft:"10%"}}
																				name={[item,'isAdmin']}
																				valuePropName="checked"
																				initialValue={this.getUserisAdmin(item)}
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
						</Form>
						{this.showAlerts()}
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
				</>
			);
    }
}

export default withRouter(GroupEdit);