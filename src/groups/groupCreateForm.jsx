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
        //Validar nombre único
        /*
				this.setState({ 
					showMessageModal: true, 
					message: {
						title:'El nombre de grupo ya está en uso',
						description:'Debe ingresar otro nombre de grupo',
						type:'validate'
					}
				})
				*/      
        //Query para hacer el insert del grupo
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
										name="groupMembers"
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