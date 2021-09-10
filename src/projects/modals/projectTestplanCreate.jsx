import { withRouter } from "react-router";
import React from 'react';
import { createTestplanForProject } from '../../services/testplansService';
import {
    Modal,
    Form,
    Input,
    Alert,
    Row,
    Col,
    Select,
		Divider
} from 'antd';
import {
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import MessageModal from '../../common/messageModal';

const { Option } = Select

class ProjectTestplanCreate extends React.Component {
    constructor(props){
			super(props)
			this.onNewTagChange = this.onNewTagChange.bind(this)
			this.addItemTag = this.addItemTag.bind(this)
			this.handleSubmit = this.handleSubmit.bind(this)
			this.closeMessageModal = this.closeMessageModal.bind(this)
    }
    state = {
			groupOptions: [],
			projectOptions: [],
			tagItems: ['pumas','regresiones','usuario'],
			newTag: '',
			showMessageModal: false,
			message: {
				title:undefined,
				description:undefined,
				type: undefined
			},
			success: false
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

    handleSubmit(values) {
			const { close, projectId } = this.props        
			let params = {
					idproject: projectId,
					name: values.name,
					description: values.description,
					tags: values.tags            
			}
			createTestplanForProject(params).then((result)=>{
				const { success } = result
				if(success) {
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
				else {
					if(result.hasOwnProperty('validate')) {
						this.setState({ 
						success: false,
						showMessageModal: true, 
						message: {
							title:'Ese nombre ya existe',
							description:'Debe ingresar otro nombre para el plan de pruebas',
							type:'validate'
							}
						})						
					}
				}
			})
    }
		
		closeMessageModal() {
			const { close,reloadSearch } = this.props
			this.setState({ showMessageModal: false, success: false })
			close()
			reloadSearch()
		}

    render() {
        const { visibleCreateTestplan, close } = this.props
        const { projectOptions, groupOptions, tagItems, newTag, showMessageModal, message } = this.state
        const layout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        }
        
        return(
            <>
							<Modal
									title="Crear plan de pruebas"
									visible={visibleCreateTestplan}
									closable={false}
									width={700}
									okText="Confirmar"
									okButtonProps={{form:'createTestplan', key: 'submit', htmlType: 'submit'}}
									cancelText="Cancelar"
									onCancel={close}
									destroyOnClose={true}                
									maskClosable={false}
									keyboard={false}
							>
								<Form {...layout}
										name="createTestplan"
										layout="horizontal"
										onFinish={this.handleSubmit}
								>
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
																						Agregar etiqueta
																				</a>
																		</div>
																</div>
														)}                            
												>
														{tagItems.map(item => <Option key={item}>{item}</Option>)}
												</Select>
										</Form.Item>
								</Form>
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

export default withRouter(ProjectTestplanCreate);