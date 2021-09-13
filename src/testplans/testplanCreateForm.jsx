import React from 'react';
import { createTestplan, getTagsForTestplan } from '../services/testplansService';
import { getGroupsDropdown, getProjectsDropdown } from '../services/projectsService';
import {
    Typography,
    Divider,
    Form,
    Input,
    Button,    
    Select,
    Breadcrumb,
} from 'antd';
import { 
PlusOutlined,
} from '@ant-design/icons';
import { withRouter } from "react-router";
import MessageModal from '../common/messageModal';

const { Title } = Typography
const { Option } = Select

class TestplanCreateForm extends React.Component {
    constructor(props) {
			super(props)
			this.getProjectOptions = this.getProjectOptions.bind(this)
			this.onNewTagChange = this.onNewTagChange.bind(this)
			this.addItemTag = this.addItemTag.bind(this)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.closeMessageModal = this.closeMessageModal.bind(this)
			this.resetForm = this.resetForm.bind(this)
			this.getTagOptions = this.getTagOptions.bind(this)
    }

    state = {
			groupOptions: [],
			projectOptions: [],
			tagItems: [],
			newTag: '',
			showMessageModal: false,
			message: {
				title:undefined,
				description:undefined,
				type: undefined
			},
			success: false
    }
		
	componentDidMount() { 
		const { user } = this.props
		getGroupsDropdown(user.id).then((result)=>{
			if(result.success) {
				this.setState({ groupOptions: result.groups })				
			}				
		})
	}

	getProjectOptions(groupId) {
		getProjectsDropdown(groupId).then((result)=>{
			if(result.success) {
				this.setState({ projectOptions: result.projects })				
			}				
		})
	}
				
	onNewTagChange(e) {
					this.setState({ newTag: e.target.value })
	}

	addItemTag() {
			const { tagItems, newTag } = this.state;
			this.setState({
					tagItems: [...tagItems, newTag],
					newTag: '',
			});
	}
	
	getTagOptions() {
		getTagsForTestplan().then((result)=>{
			if(result.success) {
				this.setState({ tagItems: result.tags })				
			}				
		})
	}	

	handleSubmit(values) {
			console.log(values)
			const { project } = this.props
			let params = {
					groupId: values.groupId,
					projectId: values.projectId,
					name: values.name,
					description: values.description,
					tags: values.tags            
			}
			createTestplan(params).then((result)=>{
				if(result.success) {
					this.setState({ 
						success: true,
						showMessageModal: true, 
						message: {
							title:'Plan de pruebas creado',
							description:'Se creó el plan de pruebas con éxito.',
							type:'success'
							}
					})					
				}
				else {
					if(result.hasOwnProperty('validate')) {
						this.setState({ 
							success: true,
							showMessageModal: true, 
							message: {
								title:'El nombre ya existe',
								description:'Debe ingresar otro nombre para el plan de pruebas.',
								type:'validate'
								}
						})						
					}
					else {
						this.setState({ 
							success: true,
							showMessageModal: true, 
							message: {
								title:'Hubo un error',
								description:'No se pudo crear el plan de pruebas',
								type:'validate'
								}
						})						
					}
				}
			})
			// Query para instertar plan
			this.setState({ 
				success: true,
				showMessageModal: true, 
				message: {
					title:'Plan de pruebas creado',
					description:'Se creó el plan de pruebas con éxito',
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
			document.getElementById("testplanForm_groupId").value = ''
			document.getElementById("testplanForm_projectId").value = ''
			document.getElementById("testplanForm_name").value = ''
			document.getElementById("testplanForm_description").value = ''
			document.getElementById("testplanForm_tags").value = ''
			document.getElementById("testplanForm").reset()
		}

    render() {
        const { projectOptions, groupOptions, tagItems, newTag, showMessageModal, message } = this.state
        const { project } = this.props
				const layout = {
					labelCol: { span:5 },
					wrapperCol: {  span: 14 },
				}
				const tailLayout = {
					wrapperCol: { offset: 5, span: 12 },
				}
        return(            
            <>
							<Form {...layout}
									name="testplanForm"
									layout="horizontal"
									onFinish={this.handleSubmit}
							>
										<Form.Item
												label="Grupo"
												name="groupId"
												rules={[{ required: true, message: 'Seleccione un grupo.' }]}
										>
												<Select
														allowClear
														placeholder="Seleccione un grupo"
																onChange={id=>this.getProjectOptions(id)}
												>
														{groupOptions.map(e => (<Option key={e.key}>{e.name}</Option>))}
												</Select>
										</Form.Item>
										<Form.Item 
												label="Proyecto"
												name="projectId"
												rules={[{ required: true, message: 'Seleccione un proyecto.' }]}
										>
												<Select>
														{projectOptions.map(item => (<Option key={item.id}>{item.name}</Option>))}
												</Select>
										</Form.Item>
									<Form.Item 
											label="Nombre"
											name="name"
											rules={[{ required: true, message: 'El nombre del plan está vacío.' }]}
									>
											<Input/>
									</Form.Item>
									<Form.Item 
											label="Descripcion"
											name="description"
									>
											<Input.TextArea 
													maxLength={500}
													autoSize={{ minRows: 5 }}
											/>
									</Form.Item>
									<Form.Item
											label="Etiquetas"
											name="tags"
									>
											<Select 
													mode="tags"  
													onDropdownVisibleChange={this.getTagOptions}
													dropdownRender={menu => (
															<div>
																	{menu}
																	<Divider style={{ margin: '4px 0' }} />
																	<div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
																			<Input style={{ flex: 'auto' }} value={newTag} onChange={this.onNewTagChange} />
																			<a
																					style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
																					onClick={this.addItemTag}
																			>
																					<PlusOutlined /> Agregar etiqueta
																			</a>
																	</div>
															</div>
													)}                            
											>
													{tagItems.map(item => <Option key={item.tag}>{item.tag}</Option>)}
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

export default withRouter(TestplanCreateForm);