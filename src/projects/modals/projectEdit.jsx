import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import React from 'react';
import '../../CustomStyles.css';
import { getProjectById, updateProject } from '../../services/projectsService';
import {
    Modal,
    Row,
    Col,
	Typography,
	Tooltip,
	Button,
	Divider,
	List,
	Skeleton,
	Tag
} from 'antd';
import {
	ExclamationCircleOutlined,
	PlusCircleOutlined,
	EditOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import MessageModal from '../../common/messageModal';
import TestplanDelete from '../../testplans/modals/testplanDelete';
import ProjectTestplanCreate from './projectTestplanCreate';

const { Title,Text } = Typography

class ProjectEdit extends React.Component {
	constructor(props){
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.showTestplans = this.showTestplans.bind(this)
		this.statusTag = this.statusTag.bind(this)
		this.reloadTestplanSearch = this.reloadTestplanSearch.bind(this)
		this.closeMessageModal = this.closeMessageModal.bind(this)
	}

	state = {
		project: {
				id: undefined,
				createdOn: undefined,
				name: undefined,
				group: undefined,
				testplanList: []
		},
		dirty: false,
		field: {
			name: undefined,
		},
		showMessageModal: false,
		message: {
			title:undefined,
			description:undefined,
			type: undefined
			},
		loading: true,
		showCancelModal: false,
		success: false,
		visibleTestplanDelete: false,
		visibleCreateTestplan: false,
		editTestplanId: undefined
	}

	componentDidMount() {
		const { projectId } = this.props
		getProjectById(projectId).then((result)=>{
			if(result.success) {
				this.setState({ project: result.project, field:{name:result.project.name}, loading: false })
			}
		})		
	}
	
	reloadTestplanSearch() {
		const { projectId } = this.props
		this.setState({ loading:true })
		getProjectById(projectId).then((result)=>{
			if(result.success) {
				this.setState({ project: result.project, field:{name:result.project.name}, loading: false })
			}
		})
	}

	handleSubmit() {
		const { projectId } = this.props
		const { field } = this.state
		field.id = projectId
		console.log(field.name)
		if(field.name === '' || field.name === undefined) {
			this.setState({
				showMessageModal: true, 
				message: {
					title:'Nombre vacío',
					description:'Debe ingresar otro nombre.',
					type:'validate'
				}
			})			
		}
		else {
			updateProject(field).then((result)=>{
				let { success } = result
				if(success) {
					this.setState({
						success: true,
						showMessageModal: true, 
						message: {
							title:'Proyecto modificado',
							description:'El proyecto se modificó con éxito.',
							type:'success'
						}
					})					
				}
				else {
					if(result.validate) {
						this.setState({
							showMessageModal: true, 
							message: {
								title:'Un proyecto con ese nombre ya existe',
								description:'Debe ingresar otro nombre.',
								type:'validate'
							}
						})						
					}
				}
			})
		}
	}
	
	closeMessageModal() {
		const { success }  = this.state
		const { closeEdit, reloadSearch } = this.props
		this.setState({ showMessageModal: false })
		if(success) {
			closeEdit()
			reloadSearch()			
		}
	}

	statusTag(status) {
		switch(status) {
				case 'Not executed':
						return <Tag color="#999997">No ejecutado</Tag>
				case 'In progress':
						return <Tag color="#ebcf52">En progreso</Tag>
				case 'Passed':
						return <Tag color="#09de8c">Pasó</Tag>
				case 'Failed':
						return <Tag color="#f50">Falló</Tag>
				default:
					return <></>
		}
	}
		
	showTestplans() {
		const { project, loading } = this.state
		return(
			<Skeleton
				loading={loading}	
				paragraph={{ rows: 7 }}
				active
			>
				<List
						size="small"
						pagination={{
								pageSize: 7,
								size: "small"
								}}
						dataSource={project.testplanList}
						bordered={true}
						renderItem={item => (
								<List.Item
										key={item.key}
										span={4}
										actions={[
												this.statusTag(item.status),
												<Link key={`link-${item.key}`} to={{ pathname: "/testplans/id=" + item.id }} style={{color:"#228cdbff"}}>
													<EditOutlined style={{ fontSize: '150%'}} />
												</Link>,
												<Tooltip key={`delete-${item.key}`} title="Eliminar plan de pruebas" color="#108ee9">
													<DeleteOutlined style={{ fontSize: '150%', color: "#ff785aff"}} onClick={()=>this.setState({ visibleTestplanDelete:true, editTestplanId:item.id })}/>
												</Tooltip>
										]}
										style={{background: "#fff"}}
										className="modal-list-item"
								>
										<List.Item.Meta
												title={item.title}
												description={'Fecha creación: ' + item.createdOn}
												/>
								</List.Item>
						)}
				/>
			</Skeleton>
		)
	}

	render() {
			const { visibleEdit, closeEdit } = this.props
			const { project, message, showCancelModal, showMessageModal, dirty, field, visibleTestplanDelete, visibleCreateTestplan, editTestplanId } = this.state
						
			return(
					<>
							{(project.id!==undefined)?(
									<>
									<Modal
											title={<Title level={3} >Proyecto</Title>}
											visible={visibleEdit}
											closable={false}
											width={800}
											okText="Confirmar"
											okButtonProps={{onClick:this.handleSubmit, disabled: !dirty}}
											cancelText="Cancelar"
											onCancel={()=>{this.setState({showCancelModal:true})}}
											destroyOnClose={true}                
											maskClosable={false}
											keyboard={false}
									>
												<Text className="modal-title-label">Nombre</Text>
												<Title 
													className="modal-editable-title"
													level={4}
													editable={{
														tooltip: <Tooltip>Modificar nombre</Tooltip>,
														autoSize: { minRows: 1, maxRows: 2 },
														onChange: ((e)=>{
															this.setState({ dirty: true, field:{name:e} })
														})
													}}
												>
													{field.name}													
												</Title>
												<Divider/>
												<Row style={{alignItems: "center", marginBlockStart:"5%", paddingBottom: "1%"}}>
														<Col flex="1 0 70%">
																<Title className="modal-subtitle" level={5}>Planes de pruebas</Title>
														</Col>
														<Col flex="1 0 30%" style={{textAlign: "end"}}>
																<Button type="primary" shape="round" icon={<PlusCircleOutlined style={{ fontSize:"110%" }}/>} onClick={()=>this.setState({ visibleCreateTestplan:true })}>
																		Crear plan de pruebas
																</Button>
														</Col>
												</Row>
												{this.showTestplans()}
									</Modal>
									<Modal
											visible={showCancelModal}
											closable={false}
											width={400}
											onOk={() => { 
													this.setState({showCancelModal:false})
													closeEdit()
											}}
											onCancel={() => { 
														this.setState({showCancelModal:false}) 
													}}
											okText="Salir"
											cancelText="Cancelar"
									>
											<Row>
													<Col flex="1 0 20%" style={{ textAlign:"center", fontSize:"160%", alignItems: "center" }}>
													<ExclamationCircleOutlined style={{color:"#ffc02e"}} />
													</Col>
													<Col flex="1 0 80%" style={{ textAlign: "start", alignSelf: "center" }}>
													¿Salir de la modificación del proyecto?
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
							):(<></>)}
							
								{ (visibleTestplanDelete) ? (
									<TestplanDelete
										testplanId={editTestplanId}
										visibleDelete={visibleTestplanDelete}
										closeDelete={ () => this.setState({ visibleTestplanDelete: false }) }
										reloadSearch={this.reloadTestplanSearch}				
									/>
								) : (
								<></>
								)}
								{ (visibleCreateTestplan) ? (
										<ProjectTestplanCreate
												projectId={project.id}
												visibleCreateTestplan={visibleCreateTestplan}
												close={ () => this.setState({ visibleCreateTestplan: false }) }
												reloadSearch={this.reloadTestplanSearch}
										/>
								) : (
										<></>
								)}
					</>
			);
	}
}

export default withRouter(ProjectEdit);