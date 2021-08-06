import { hot } from 'react-hot-loader';
import React from 'react';
import {
    Typography,
    Divider,
    Form,
    Input,
    Button,    
    Select,
    Breadcrumb,
		Col,
  } from 'antd';
import MessageModal from '../common/messageModal';

const { Text,Title } = Typography
const { Option } = Select

class ProjectCreateForm extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
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
			groupList: [],
	}

	componentDidMount() {
			//Query para traer todos los grupos
			//traer un array con TODOS los grupos elegibles
			let groups = []
			for (let index = 0; index < 3; index++) {
					groups.push(
							{
									key:'group'+index*10,
									id:index*10,
									name: 'Grupo ' + (index + 1)
							}
					)
			}
			this.setState({ groupList: groups })
	}
	
	handleSubmit(values) {
		//Query para hacer el insert del grupo
		this.setState({ 
			success: true,
			showMessageModal: true, 
			message: {
				title:'Proyecto creado',
				description:'Se creó el proyecto con éxito',
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
		document.getElementById("createProjectForm_projectName").value = ''
		document.getElementById("createProjectForm_projectGroup").value = ''
		document.getElementById("createProjectForm").reset()
	}

	render() {
		const { showMessageModal, message, groupList } = this.state
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
				name="createProjectForm"
				layout="horizontal"
				onFinish={this.handleSubmit}
			>
				<Form.Item 
					label="Nombre"
					name="projectName"
					rules={[{ required: true, message: 'El nombre del proyecto está vacío.' }]}
				>
					<Input/>
				</Form.Item>
				<Form.Item 
					label="Grupo"
					name="projectGroup"
					rules={[{ required: true, message: 'Seleccione un grupo.' }]}
				>
				<Select>
					{groupList.map((e)=><Option key={e.key}>{e.name}</Option>)}
				</Select>
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

export default hot(module)(ProjectCreateForm);